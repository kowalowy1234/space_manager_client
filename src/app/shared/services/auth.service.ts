import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _accessToken: string | null = null;
    private _refreshToken: string | null = null;

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
    ) {
        this._accessToken = localStorage.getItem('accessToken') || null;
        this._refreshToken = localStorage.getItem('refreshToken') || null;
    }

    getAccessToken() {
        return this._accessToken;
    }
    getRefreshToken() {
        return this._refreshToken;
    }

    isSignedIn() {
        return !!this._accessToken;
    }

    refreshToken() {
        return this.http.post<{ access_token: string }>('auth/refresh-token', {
            token: this.refreshToken,
        })
    }

    setAccessToken(accessToken: string) {
        this._accessToken = accessToken;
    }

    setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
    }

    signIn(email: string, password: string) {
        return this.http.post<{
            access_token: string;
            refresh_token: string;
        }>('auth/sign-in', {
            email,
            password
        })
    }
    
    signInWithGoogle() {
        return this.http.get('auth/sign-in/google');
    }

    signOut() {
        this._accessToken = null;
        this._refreshToken = null;

        this.router.navigate(['/'])
    }
}
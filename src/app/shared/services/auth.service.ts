import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _accessToken: string | null = null;
    private _refreshToken: string | null = null;

    isSignedIn$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
    ) {
        this._accessToken = localStorage.getItem('SPCMGR_accessToken') || null;
        this._refreshToken = localStorage.getItem('SPCMGR_refreshToken') || null;

        if(this._accessToken) {
            this.isSignedIn$.next(true);
        }
    }

    getAccessToken() {
        return this._accessToken;
    }

    getRefreshToken() {
        return this._refreshToken;
    }

    isSignedInObservable() {
        return this.isSignedIn$.asObservable();
    }

    refreshToken() {
        return this.http.post<{ access_token: string }>('auth/refresh-token', {
            token: this._refreshToken,
        })
    }

    setAccessToken(accessToken: string) {
        this._accessToken = accessToken;
        localStorage.setItem('SPCMGR_accessToken', accessToken);
    }

    setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
        localStorage.setItem('SPCMGR_refreshToken', refreshToken);
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
    
    signInWithGoogle(returnUrl: string = '/dashboard') {
        const currentOrigin = window.location.origin; 
        const state = btoa(currentOrigin); 
        window.location.href = `${environment.apiUrl}/auth/sign-in/google?state=${state}`;
    }

    signOut() {
        this._accessToken = null;
        this._refreshToken = null;

        this.router.navigate(['/'])
    }
}
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export function authErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>>{
    const authService = inject(AuthService);

    next(req).pipe(
        catchError((error: any) => {
            if (
                error instanceof HttpErrorResponse &&
                error.status === 401 &&
                !req.url.includes('/sign-in') &&
                !req.url.includes('/google') &&
                !req.url.includes('/refresh-token')
            ) {
                return handle401Error(req, next, authService);
            }
            return throwError(() => error);
        })
    ).subscribe()

    return next(req);
}

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.access_token);
        // Retry the original request with the new token
        return next(req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.signOut(); // Refresh failed, force logout
        return throwError(() => err);
      })
    );
  } else {
    // If refresh is already in progress, wait for it to complete
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap((token) => next(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })))
    );
  }
}
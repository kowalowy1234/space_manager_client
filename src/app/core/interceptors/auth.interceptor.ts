import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {

  const accessToken = inject(AuthService).getAccessToken();

  let request: HttpRequest<unknown> = req.clone();

  if (accessToken) {
    request = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
    });
  }

  return next(request);
}
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const router = inject(Router)

  const modifiedReq = req.clone({
    withCredentials: true
  })
  return next(modifiedReq).pipe(

    catchError((error) => {
      const isRefreshCall = req.url.includes('/api/auth/refresh-token');

      if (error.status === 401 && !isRefreshCall) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const retryReq = req.clone({ withCredentials: true });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.logout().subscribe();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);

    })
  )
};

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.authService.getUserRole(user.uid).pipe(
            map(userRole => userRole === 'admin')
          );
        } else {
          return of(false);
        }
      }),
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']); 
          return false;
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private cookieService : CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
    return this.router.navigateByUrl('/login').then(() => false);
    }
    return true;
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    //     // if (!this.authService.isLoggedIn()) {
    //     //     return this.router.navigateByUrl('/login').then(() => false);
    //     // }
        
    //     const role = this.cookieService.get('role');
    //     if (role === 'ADMIN') {
    //     return true;
    //     } else if (role === 'USER') {
    //     return true;
    //     } else {
    //     this.router.navigate(['/login']);
    //     return false;
    //     }
    // }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    //     const role = this.cookieService.get('role');
    //     if (role === 'ADMIN') {
    //         return true;
    //     } else if (role === 'USER') {
    //         const blockedRoutes = [ '/admin-quiz-detail/:name', '/admin-user-detail/:name/:username'];
    //         if(blockedRoutes.indexOf(state.url) !== -1){
    //             this.router.navigate(['/unauthorized']);
    //             return false;
    //         }
    //         return true;
    //     } else {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    // }
 
}

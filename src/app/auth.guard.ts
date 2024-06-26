import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { AuthService } from './auth.service';
;

export class AuthGuard  implements CanActivate {

  constructor(private authService: AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser){
      return true;
    }  


    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
  


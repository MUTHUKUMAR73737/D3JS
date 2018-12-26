import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class RoleGuard  {

  constructor() {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

// return false;
//   }
}

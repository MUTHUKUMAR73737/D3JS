import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(token, role, email, username, userId, phone) {
    localStorage.setItem('currentUser', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('phone', phone);
    location.reload();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone');
    location.reload();
  }

  isAuthenticated(): Boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      return true;
    }
    return false;
  }

  // isAuthenticatedRole(): Boolean {
  //   const currentUserRole = localStorage.getItem('role');
  //   if (currentUserRole !== null) {
  //     return true;
  //   }
  //   return false;
  // }



  isAuthenticatedUser(): Boolean {
    const currentUser = localStorage.getItem('currentUser');
    const role = localStorage.getItem('role');

    if (currentUser !== null && role === 'user') {
      return true;
    }
    return false;
  }

  isAuthenticatedAdmin(): Boolean {
    const currentUser = localStorage.getItem('currentUser');
    const role = localStorage.getItem('role');

    if (currentUser !== null && role === 'admin') {
      return true;
    }
    return false;
  }


  isAuthenticatedSuperAdmin(): Boolean {
    const currentUser = localStorage.getItem('currentUser');
    const role = localStorage.getItem('role');

    if (currentUser !== null && role === 'superadmin') {
      return true;
    }
    return false;
  }



}

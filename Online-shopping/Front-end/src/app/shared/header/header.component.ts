import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login/login.component';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'e-shopping-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router?: Router,
    public dialog?: MatDialog,
    private authService?: AuthService
  ) {}
  isAuthenticated: Boolean = false;
  isAuthenticatedUser: Boolean = false;
  isAuthenticatedAdmin: Boolean = false;
  isAuthenticatedSuperAdmin: Boolean = false;
  username: String = '';

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAuthenticatedUser = this.authService.isAuthenticatedUser();
    this.isAuthenticatedAdmin = this.authService.isAuthenticatedAdmin();
    this.isAuthenticatedSuperAdmin = this.authService.isAuthenticatedSuperAdmin();
    this.username = localStorage.getItem('username');
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '380px',
      disableClose: false,
      closeOnNavigation: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The component dialog was closed');
    });
  }

  getLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}

import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { User } from './_models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dating app';
  jwtHelper: JwtHelper = new JwtHelper();

constructor(private authService: AuthService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      if (this.authService.currentUser.photoUrl !== null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else
      {
        this.authService.changeMemberPhoto('../assets/user.jpg');
      }

    }
  }
}

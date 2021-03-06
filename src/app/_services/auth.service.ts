
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: Http) { }

  changeMemberPhoto(photoUrl: string) {
      this.photoUrl.next(photoUrl);

  }

  login(user: User) {
    const headers = new Headers({'Content-type': 'application/json' });
    const options = new RequestOptions({headers : headers});
    return this.http.post(this.baseUrl + 'login', user, options).map((response: Response) => {
        const user = response.json();

        if (user) {
            localStorage.setItem('token', user.tokenString);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.currentUser = user.user;
            this.userToken = user.tokenString;
            if (this.currentUser.photoUrl != null) {
                this.changeMemberPhoto(this.currentUser.photoUrl);
            } else {
              this.changeMemberPhoto('../../assets/user.jpg');
            }
        }
    }).catch(this.handleError);
}

loggedIn() {
    return tokenNotExpired('token');
}
register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
}

private requestOptions() {
    const headers = new Headers({'Content-type': 'application/json'})
    return new RequestOptions({headers: headers});
}
private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    let test: any;
    try {
         test = error.json();
    } catch {
        return Observable.throw('Unauthorize user');

    }

    let modelStateErrors = '';
    const  serverError: any = error.json();

    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }

    }
    return Observable.throw(
        modelStateErrors || 'Server Error'
    );
}}

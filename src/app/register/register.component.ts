import { AuthService } from '../_services/auth.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username : new FormControl('Hello', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator)
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {'mismatch' : true};
  }
  register() {
    console.log(this.registerForm.value);
 /*  
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
    },
  error => {this.alertify.error(error);

  });
*/

  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}

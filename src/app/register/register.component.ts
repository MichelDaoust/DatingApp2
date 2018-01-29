import {AuthService} from '../_services/auth.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
    },
  error => {this.alertify.error(error);

  });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
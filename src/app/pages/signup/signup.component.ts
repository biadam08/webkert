import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    name: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    }),
    addressGroup: new FormGroup({
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    }),
    role: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;
  hide = true;


  constructor(private location: Location, private authService: AuthService, private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    const user = this.signUpForm.value;
    if (user.password !== user.rePassword) {
      this.errorMessage = 'Nem egyezik a két jelszó.';
      return;
    }
    if (user.password.length < 6) {
      this.errorMessage = 'Túl rövid a jelszó.';
      return;
    }

    this.authService.signup(user.email, user.password).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('email')?.value.split('@')[0],
        phone: this.signUpForm.get('phone')?.value,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value,
          lastname: this.signUpForm.get('name.lastname')?.value
        },
        address: {
          city: this.signUpForm.get('addressGroup.city')?.value,
          street: this.signUpForm.get('addressGroup.street')?.value
        },
        role: this.signUpForm.get('role')?.value
      }
      this.userService.create(user).then(_ => {
        this.router.navigate(['/main']); 
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Ez az e-mail cím már foglalt!';
      } if(error.code === 'auth/invalid-email'){
        this.errorMessage = 'Adj meg valós e-mail címet!'
      } else {
        this.errorMessage = error.message;
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
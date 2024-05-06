import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {

      this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
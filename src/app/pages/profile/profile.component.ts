import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;
  updateSuccess: boolean | undefined;
  private authSubscription: Subscription | undefined;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(authUser => {
      if (authUser) {
        const userId = authUser.uid;
        this.userService.getUserById(userId).subscribe((userData: User | undefined) => {
          if (userData) {
            this.user = userData;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  updateUser(): void {
    if (this.user) {
      this.userService.updateUser(this.user.id, this.user).then(() => {
        this.updateSuccess = true;
      }).catch(error => {
        this.updateSuccess = false;
      });
    } else {
      this.updateSuccess = false;
    }
  }

  deleteUser(): void {
    if (this.user) {
      this.userService.delete(this.user.id).then(() => {
        this.authService.logout(); 
        this.router.navigate(['/login']);
      }).catch(error => {
        console.log('Hiba történt a törlés során', error);
      });
    }
  }

  
}

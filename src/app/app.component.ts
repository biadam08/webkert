import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Title';
  page = 'main';

  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;
  userIsAdmin?: boolean;

  constructor(private router: Router, private authService: AuthService){
    
  }

  ngOnInit(){
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if(this.routes.includes(currentPage)){
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      if (user) {
        this.authService.getUserRole(user.uid).subscribe(role => {
          this.userIsAdmin = role === 'admin';
        });
      }
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify(null));
      console.error(error);
    });
  }

  changePage(selectedPage: string){
    this.page = selectedPage;
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
  
  onClose(event: any, sidenav: MatSidenav){
    if(event === true){
      sidenav.close();
    }
  }

  logout(_?: boolean){
    this.authService.logout().then(() => {
      console.log('Logged out successfully')
      }, error => {
        console.error(error);
      });
  }

}

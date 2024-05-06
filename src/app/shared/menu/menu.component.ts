import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Input() userIsAdmin?: boolean;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean){
    this.onCloseSidenav.emit(true);
    if (logout == true){
      this.onLogout.emit(logout);
    }
  }
}

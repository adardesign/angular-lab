import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[SessionService]
})
export class HeaderComponent implements OnInit {
  sessions;
  constructor(sessions: SessionService) {
       this.sessions = sessions.getSessions();
  }

  ngOnInit() {

  }

  searchValue:string;
}

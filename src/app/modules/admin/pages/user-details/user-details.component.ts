import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: User[];
  constructor(private authService : AdminAuthService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(res => {
      console.log("res : ", res);
      this.users = res;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { BuisnessService } from '../../services/buisness.service';
import { ActivatedRoute } from '@angular/router';
import { BuisnessModel } from '../../models/buisness.model';
import { IsModalService, IsModalSize } from 'app/lib';
import { AddInvestorDialogComponent } from '../../components/add-investor-dialog/add-investor-dialog.component';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent implements OnInit {
  buisness: BuisnessModel;
  users = [];
  buisnessUsers = [];
  constructor(private buisnessService : BuisnessService, private userService: AdminAuthService, private route: ActivatedRoute, private isModalService: IsModalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buisnessService.getBuisness(params['id']).subscribe(res => {
        this.buisness = res;
        console.log("this.buisness : ", this.buisness);
        this.buisnessService.getBuisnessUsers(params['id']).subscribe(res2 => {
          this.buisnessUsers = res2;
          console.log("this.buisnessUsers : ", this.buisnessUsers);
        })
      })
    })
  }

  addInvestorHandler(){
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      let addInvestorDialog = this.isModalService.open(AddInvestorDialogComponent,{
        size: IsModalSize.Large, data: {users: this.users, maxInvestment: 40000}
      })
      addInvestorDialog.onClose.subscribe(res => {
        if(res){
          console.log('investor ....... ', res.investor);
          this.buisnessService.setBuisnessUser(this.buisness.id, res.investor).subscribe(newInvestorRes => {
            console.log("newInvestor is : ", newInvestorRes)
          })
        }
      })
    })
  }

}

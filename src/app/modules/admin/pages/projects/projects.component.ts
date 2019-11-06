import { Component, OnInit } from '@angular/core';
import { BuisnessService } from '../../services/buisness.service';
import { BuisnessModel } from '../../models/buisness.model';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  buisnesses: BuisnessModel[] = [];
  constructor(private buisnessService : BuisnessService) { }

  ngOnInit() {
    this.buisnessService.getBuisnesses().subscribe(res => {
      this.buisnesses = res;
      console.log("this.buisnesses is : ", this.buisnesses);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { BuisnessService } from '../../services/buisness.service';
import { ActivatedRoute } from '@angular/router';
import { BuisnessModel } from '../../models/buisness.model';

@Component({
  selector: 'project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent implements OnInit {
  buisness: BuisnessModel;
  constructor(private buisnessService : BuisnessService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buisnessService.getBuisness(params['id']).subscribe(res => {
        this.buisness = res;
        console.log("this.buisness : ", this.buisness)
      })
    })
  }

}

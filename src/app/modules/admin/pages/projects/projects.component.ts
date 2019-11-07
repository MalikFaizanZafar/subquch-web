import { Component, OnInit } from '@angular/core';
import { BuisnessService } from '../../services/buisness.service';
import { BuisnessModel } from '../../models/buisness.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  buisnesses: BuisnessModel[] = [];
  constructor(private buisnessService : BuisnessService, private router : Router, private currentRoute : ActivatedRoute) { }

  ngOnInit() {
    this.buisnessService.getBuisnesses().subscribe(res => {
      this.buisnesses = res;
      // console.log("this.buisnesses is : ", this.buisnesses);
    })
  }

  onAddProjectHandler(){
    this.router.navigate(['new'], {relativeTo: this.currentRoute})
  }

  onViewProjectHandler(id : Number){
    this.router.navigate([id, 'view'], {relativeTo: this.currentRoute})
  }
}

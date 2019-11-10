import { Component, OnInit } from "@angular/core";
import { BuisnessService } from "../../services/buisness.service";
import { BuisnessModel } from "../../models/buisness.model";
import { Router, ActivatedRoute } from "@angular/router";
import { IsModalService } from "app/lib";
import { DeleteBuisnessDialogComponent } from "../../components/delete-buisness-dialog/delete-buisness-dialog.component";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  buisnesses: BuisnessModel[] = [];
  constructor(
    private buisnessService: BuisnessService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private isModalService: IsModalService
  ) {}

  ngOnInit() {
    this.buisnessService.getBuisnesses().subscribe(res => {
      this.buisnesses = res;
      // console.log("this.buisnesses is : ", this.buisnesses);
    });
  }

  onAddProjectHandler() {
    this.router.navigate(["new"], { relativeTo: this.currentRoute });
  }

  onViewProjectHandler(id: Number) {
    this.router.navigate([id, "view"], { relativeTo: this.currentRoute });
  }

  onDeleteProjectHandler(id: number) {
    let deleteBuisnessDialog = this.isModalService.open(DeleteBuisnessDialogComponent);
    deleteBuisnessDialog.onClose.subscribe(dialogRes => {
      console.log("dialogRes : ", dialogRes);
      if(dialogRes == 'yes'){
        this.buisnessService.deleteBuisness(id).subscribe(res => {
          console.log("res : ", res);
          this.buisnesses = this.buisnesses.filter(b => b.id != id);
          console.log("buisness(after delete) : ", this.buisnesses)
        })
      }
    })
  }
}

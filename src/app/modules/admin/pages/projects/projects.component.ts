import { Component, OnInit } from "@angular/core";
import { BuisnessService } from "../../services/buisness.service";
import { BuisnessModel } from "../../models/buisness.model";
import { Router, ActivatedRoute } from "@angular/router";
import { IsModalService, IsButton } from "app/lib";
import { DeleteBuisnessDialogComponent } from "../../components/delete-buisness-dialog/delete-buisness-dialog.component";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  buisnesses: BuisnessModel[] = [];
  key: string = "";
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
  onSearchKeyUp(event: any) {
    this.key = event.target.value;
  }
  onSearchProjectHandler(btn: IsButton) {
    btn.startLoading()
    console.log("key : ", this.key);
    if (this.key.length == 0) {
      this.buisnessService.getBuisnesses().subscribe(res => {
        this.buisnesses = res;
        btn.stopLoading()
      });
    } else {
      this.buisnessService.searchBuisnesses(this.key).subscribe(res => {
        this.buisnesses = res;
        btn.stopLoading()
      });
    }
  }
  onAddProjectHandler() {
    this.router.navigate(["new"], { relativeTo: this.currentRoute });
  }

  onViewProjectHandler(id: Number) {
    this.router.navigate([id, "view"], { relativeTo: this.currentRoute });
  }

  onActivateClick(id: number){
    this.onDeleteProjectHandler(id);
  }

  onDeleteProjectHandler(id: number) {
    let deleteBuisnessDialog = this.isModalService.open(
      DeleteBuisnessDialogComponent
    );
    deleteBuisnessDialog.onClose.subscribe(dialogRes => {
      console.log("dialogRes : ", dialogRes);
      if (dialogRes == "yes") {
        this.buisnessService.deleteBuisness(id).subscribe(res => {
          this.buisnesses = this.buisnesses.filter(b => b.id != id);
        });
      }
    });
  }

  onEditProjectHandler(id: number) {
    this.router.navigate([id, "edit"], { relativeTo: this.currentRoute });
  }

}

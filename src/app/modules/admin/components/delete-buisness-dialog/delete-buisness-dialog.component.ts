import { Component, OnInit } from "@angular/core";
import { IsActiveModal } from "app/lib";

@Component({
  selector: "delete-buisness-dialog",
  templateUrl: "./delete-buisness-dialog.component.html",
  styleUrls: ["./delete-buisness-dialog.component.css"]
})
export class DeleteBuisnessDialogComponent implements OnInit {

  constructor(private isActiveModal: IsActiveModal) {}

  ngOnInit() {}


  onYesHandler(){
    this.isActiveModal.close('yes')
  }
}

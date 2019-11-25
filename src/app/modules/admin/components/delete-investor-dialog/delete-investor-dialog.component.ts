import { Component, OnInit } from '@angular/core';
import { IsActiveModal } from 'app/lib';

@Component({
  selector: 'delete-investor-dialog',
  templateUrl: './delete-investor-dialog.component.html',
  styleUrls: ['./delete-investor-dialog.component.css']
})
export class DeleteInvestorDialogComponent implements OnInit {

  constructor(private isActiveModal: IsActiveModal) {}

  ngOnInit() {}


  onYesHandler(){
    this.isActiveModal.close('yes')
  }

}

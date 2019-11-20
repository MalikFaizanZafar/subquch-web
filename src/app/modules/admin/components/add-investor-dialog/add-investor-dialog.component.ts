import { Component, OnInit } from '@angular/core';
import { IsActiveModal, IsButton } from 'app/lib';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-investor-dialog',
  templateUrl: './add-investor-dialog.component.html',
  styleUrls: ['./add-investor-dialog.component.css']
})
export class AddInvestorDialogComponent implements OnInit {
  users = [];
  maxInvestment = 0;
  investorForm: FormGroup;
  constructor(private activeModal : IsActiveModal) { }

  ngOnInit() {
    this.users = this.activeModal.data.users;
    this.maxInvestment = this.activeModal.data.maxInvestment;
    this.investorForm = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      investment: new FormControl(this.maxInvestment, [Validators.required, Validators.max(this.maxInvestment)])
    })
  }

  onInvestorFormSubmit(btn : IsButton){
    console.log("investor value is : ", this.investorForm.value);
    let newInvestor = {
      ...this.investorForm.value,
    }
    this.activeModal.close({investor: newInvestor})
  }

}

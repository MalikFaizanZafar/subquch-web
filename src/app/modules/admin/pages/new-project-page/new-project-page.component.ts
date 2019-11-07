import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuisnessModel } from './../../models/buisness.model'
import { BuisnessService } from '../../services/buisness.service';
import { IsButton } from 'app/lib';
import { Router } from '@angular/router';
@Component({
  selector: 'new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {
  buisnessForm: FormGroup;
  constructor(private buisnessService: BuisnessService, private router : Router) { }

  ngOnInit() {
    this.buisnessForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      totalWorth: new FormControl(null, [Validators.required]),
      monthlyWorth: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      disclaimer: new FormControl(null, [Validators.required]),
      summary: new FormControl(null, [Validators.required]),
      detailDescription: new FormControl(null, [Validators.required])
    });
  }

  onBuisnessFormSubmit(btn : IsButton){
    btn.startLoading();
    let formValues = this.buisnessForm.value;
    let newBuisness: BuisnessModel = formValues;
    newBuisness.remainingShares = 0;
    newBuisness.logoUrl = "";
    newBuisness.enabled = false;
    newBuisness.images = [];
    console.log("newBuisness ", newBuisness)
    this.buisnessService.addBuisness(newBuisness).subscribe(res => {
      console.log("res is : ", res);
      btn.stopLoading();
      this.router.navigate(['admin', 'projects'])
    }, err => {
      btn.stopLoading();
    })
  }
}

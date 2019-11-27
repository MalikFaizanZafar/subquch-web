import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IsActiveModal } from 'app/lib';

@Component({
  selector: 'add-monthly-report-dialog',
  templateUrl: './add-monthly-report-dialog.component.html',
  styleUrls: ['./add-monthly-report-dialog.component.css']
})
export class AddMonthlyReportDialogComponent implements OnInit {

  monthlyReportFile;
  fileDataUrl;
  @ViewChild("fileInput") fileInput: ElementRef;
  constructor(private activeModal : IsActiveModal) { }

  ngOnInit() {
  }

  uploadReportHandler(){
    this.fileInput.nativeElement.click();
  }

  reportFileChangeHandler(reportFile: any) {
    console.log("reportFile : ", reportFile);
    this.monthlyReportFile = reportFile.target.files[0];
    console.log("monthlyReportFile : ", this.monthlyReportFile)
    // var input = event.target;
    var self = this;
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.fileDataUrl = dataURL;
    };
    reader.readAsDataURL(reportFile.target.files[0]);
    // this.SliderAdImageChanged = true;
  }

  saveReportHandler(){
    this.activeModal.close({
      save: true,
      file: this.monthlyReportFile
    });
  }
}

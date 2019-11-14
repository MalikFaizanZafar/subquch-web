import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { BuisnessModel } from "./../../models/buisness.model";
import { BuisnessService } from "../../services/buisness.service";
import { IsButton, IsModalService, IsModalSize } from "app/lib";
import { Router } from "@angular/router";
import { AddBuisnessDialogComponent } from "../../components/add-buisness-dialog/add-buisness-dialog.component";
@Component({
  selector: "new-project-page",
  templateUrl: "./new-project-page.component.html",
  styleUrls: ["./new-project-page.component.css"]
})
export class NewProjectPageComponent implements OnInit {
  buisnessForm: FormGroup;
  newBuisness: BuisnessModel;
  images: any[] = [];
  imageFileName: string = "";
  logoImageFile: any;
  downloadURL: Observable<string>;
  @ViewChild('logoPicker') logoPicker:ElementRef;
  constructor(
    private buisnessService: BuisnessService,
    private router: Router,
    private isModalService: IsModalService,
    private storage: AngularFireStorage
  ) {}

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

  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      console.log("dataURL : ", dataURL);
      // self.logoImageFile = dataURL
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    console.log("reader : ", reader);
    this.logoImageFile = fileInput.target.files[0]
    this.imageFileName = fileInput.target.files[0].name;
  }

  onBuisnessFormSubmit(btn: IsButton) {
    let formValues = this.buisnessForm.value;
    this.newBuisness = formValues;
    this.newBuisness.remainingShares = 0;
    this.newBuisness.logoUrl = "";
    this.newBuisness.enabled = true;
    this.images.push({
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false,
      file: this.logoImageFile
    })
    this.addBuisnessHandler(this.images, btn)
  }

  addBuisnessImageHandler(e:any) {
    e.preventDefault();
    const buisnessImagesDialog = this.isModalService.open(
      AddBuisnessDialogComponent,
      {
        backdrop: "static",
        size: IsModalSize.Large
      }
    );
    let self = this;
    buisnessImagesDialog.onClose.subscribe(res => {
      if (res !== "cancel") {
        self.images = res.images;
        console.log("self images(2) ", self.images);
      }
    });
  }
  pickLogoHandler(e:any){
    e.preventDefault();
    this.logoPicker.nativeElement.click();
  }
  addBuisnessHandler(images: any[], btn: IsButton) {
    btn.startLoading();
    this.newBuisness.images = [];
    images.map((image, i) => {
      if (image.file != undefined) {
        let randomString =
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15);
        const filePath = "projects/" + randomString + "-" + image.file.name;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, image.file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                this.newBuisness.images.push({
                  imageUrl: url,
                  banner: i == 0 ? true : false
                });
                if(images.length == i+1){
                  this.newBuisness.logoUrl = url;
                  console.log("this.newBuisness ", this.newBuisness);
                  this.buisnessService.addBuisness(this.newBuisness).subscribe(
                  res => {
                    console.log("res is : ", res);
                    btn.stopLoading();
                    this.router.navigate(["admin", "projects"]);
                  },
                  err => {
                    btn.stopLoading();
                  }
                );
                }
              });
            })
          )
          .subscribe();
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { BuisnessModel } from "./../../models/buisness.model";
import { BuisnessService } from "../../services/buisness.service";
import { IsButton, IsModalService, IsModalSize } from "app/lib";
import { Router, ActivatedRoute } from "@angular/router";
import { AddBuisnessDialogComponent } from "../../components/add-buisness-dialog/add-buisness-dialog.component";
import { EditBuisnessDialogComponent } from "../../components/edit-buisness-dialog/edit-buisness-dialog.component";
@Component({
  selector: "edit-project-page",
  templateUrl: "./edit-project-page.component.html",
  styleUrls: ["./edit-project-page.component.css"]
})
export class EditProjectPageComponent implements OnInit {
  buisnessForm: FormGroup;
  buisness: BuisnessModel;
  editedBuisness: BuisnessModel;
  images: any[] = [];
  downloadURL: Observable<string>;
  constructor(
    private buisnessService: BuisnessService,
    private router: Router,
    private route: ActivatedRoute,
    private isModalService: IsModalService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buisnessService.getBuisness(params['id']).subscribe(res => {
        this.buisness = res;
        this.buisnessForm = new FormGroup({
          title: new FormControl(this.buisness.title, [Validators.required]),
          totalWorth: new FormControl(this.buisness.totalWorth, [Validators.required]),
          monthlyWorth: new FormControl(this.buisness.monthlyWorth, [Validators.required]),
          startDate: new FormControl(this.buisness.startDate, [Validators.required]),
          endDate: new FormControl(this.buisness.endDate, [Validators.required]),
          disclaimer: new FormControl(this.buisness.disclaimer, [Validators.required]),
          summary: new FormControl(this.buisness.summary, [Validators.required]),
          detailDescription: new FormControl(this.buisness.detailDescription, [Validators.required])
        });
      })
    })
  }

  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      console.log("dataURL : ", dataURL);
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    console.log("reader : ", reader);
  }

  onBuisnessFormSubmit(btn: IsButton) {
    let formValues = this.buisnessForm.value;
    this.editedBuisness = formValues;
    this.editedBuisness.remainingShares = 0;
    this.editedBuisness.logoUrl = "";
    this.editedBuisness.enabled = true;
    this.uploadImagesToFireStorage(this.images,btn);
    console.log("editedBuisness ", this.editedBuisness);
  }
  addBuisnessImageHandler(e:any) {
    e.preventDefault();
    const buisnessImagesDialog = this.isModalService.open(
      EditBuisnessDialogComponent,
      {
        backdrop: "static",
        size: IsModalSize.Large,
        data: this.buisness.images
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

  uploadImagesToFireStorage(images: any[], btn: IsButton) {
    btn.startLoading();
    this.editedBuisness.images = images.filter(i => i.file == undefined)
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
                this.editedBuisness.images.push({
                  imageUrl: url,
                  banner: i == 0 ? true : false
                });
                if(images.length == i+1){
                  this.buisnessService.editBuisness(this.editedBuisness,this.buisness.id).subscribe(
                    res => {
                      console.log("res(editedBuisness) is : ", res);
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

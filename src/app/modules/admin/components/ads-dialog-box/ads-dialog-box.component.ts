import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IsActiveModal, IsButton } from "app/lib";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DataService } from "@app/shared/services/data.service";

@Component({
  selector: "ads-dialog-box-box",
  templateUrl: "./ads-dialog-box.component.html",
})
export class AdsDialogBoxComponent implements OnInit {
  editBrandName;
  HLAdImageFile;
  tempHLAdImage;
  adPriority = 0;
  imageWidth;
  imageHeight;
  HLPriorityAdForm: FormGroup;
  downloadURL: Observable<string>;
  HLAdImageChanged: boolean = false;
  @ViewChild("HLAdImage") HLAdImage: ElementRef;

  constructor(
    private isActiveModal: IsActiveModal,
    private storage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.isActiveModal.data == null) {
      this.imageHeight = "400px";
      this.imageWidth = "400px";
      this.HLPriorityAdForm = new FormGroup({
        HLAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    } else {
      this.HLAdImageFile = this.isActiveModal.data.image;
      this.adPriority = this.isActiveModal.data.priority;
      if (this.adPriority == 3) {
        this.imageHeight = "70px";
        this.imageWidth = "100%";
      } else if (this.adPriority == 1) {
        this.imageHeight = "100%";
        this.imageWidth = "100%";
      } else if (this.adPriority == 0) {
        this.imageHeight = "500px";
        this.imageWidth = "100%";
      } else {
        this.imageHeight = "400px";
        this.imageWidth = "400px";
      }
      this.tempHLAdImage = this.isActiveModal.data.image;
      this.HLPriorityAdForm = new FormGroup({
        HLAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    }
  }

  onEditBannerChooseImage() {
    this.HLAdImage.nativeElement.click();
  }

  onEditBannerFileChoosen(HLAdImageFile: any) {
    const self = this;
    this.HLAdImageFile = HLAdImageFile.target.files[0];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.tempHLAdImage = dataURL;
    };
    reader.readAsDataURL(HLAdImageFile.target.files[0]);
    this.HLAdImageChanged = true;
  }

  onHLPriorityAdFormSubmit(btn: IsButton) {
    console.log("formsubmit");
    if (this.HLPriorityAdForm.valid) {
      btn.startLoading();
      let randomString =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      const filePath = "ads/" + randomString + "-" + this.HLAdImageFile.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.HLAdImageFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              let HLPriorityAdPostDto = {
                image: url || this.HLAdImageFile,
                start: this.HLPriorityAdForm.value.startTime,
                end: this.HLPriorityAdForm.value.endTime,
                charges: this.HLPriorityAdForm.value.charges
              };
              btn.stopLoading();
              this.isActiveModal.close(HLPriorityAdPostDto);
            });
          })
        )
        .subscribe();
    }
  }
}

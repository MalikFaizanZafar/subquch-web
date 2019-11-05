import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IsActiveModal, IsButton } from "app/lib";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DataService } from "@app/shared/services/data.service";

@Component({
  selector: 'banner-ad-dialog',
  templateUrl: './banner-ad-dialog.component.html',
  styleUrls: ['./banner-ad-dialog.component.css']
})
export class BannerAdDialogComponent implements OnInit {

  editBrandName;
  BannerAdImageFile;
  tempBannerAdImage;
  adPriority = 0;
  imageWidth;
  imageHeight;
  BannerAdForm: FormGroup;
  downloadURL: Observable<string>;
  BannerAdImageChanged: boolean = false;
  @ViewChild("bannerAdImage") bannerAdImage: ElementRef;

  constructor(
    private isActiveModal: IsActiveModal,
    private storage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.isActiveModal.data == null) {
      this.BannerAdForm = new FormGroup({
        BannerAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    } else {
      this.BannerAdImageFile = this.isActiveModal.data.image;
      this.tempBannerAdImage = this.isActiveModal.data.image;
      this.BannerAdForm = new FormGroup({
        BannerAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(this.isActiveModal.data.charges, [Validators.required])
      });
    }
  }

  onEditBannerChooseImage() {
    this.bannerAdImage.nativeElement.click();
  }

  onEditBannerFileChoosen(HLAdImageFile: any) {
    const self = this;
    this.BannerAdImageFile = HLAdImageFile.target.files[0];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.tempBannerAdImage = dataURL;
    };
    reader.readAsDataURL(HLAdImageFile.target.files[0]);
    this.BannerAdImageChanged = true;
  }

  onBannerAdFormSubmit(btn: IsButton) {
    console.log("formsubmit");
    if (this.BannerAdForm.valid) {
      btn.startLoading();
      let randomString =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      const filePath = "ads/" + randomString + "-" + this.BannerAdImageFile.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.BannerAdImageFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              let HLPriorityAdPostDto = {
                image: url || this.BannerAdImageFile,
                start: this.BannerAdForm.value.startTime,
                end: this.BannerAdForm.value.endTime,
                charges: this.BannerAdForm.value.charges
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

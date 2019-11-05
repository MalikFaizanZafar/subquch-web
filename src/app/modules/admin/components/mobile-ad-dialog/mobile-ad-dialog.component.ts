import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IsActiveModal, IsButton } from "app/lib";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DataService } from "@app/shared/services/data.service";

@Component({
  selector: 'mobile-ad-dialog',
  templateUrl: './mobile-ad-dialog.component.html',
  styleUrls: ['./mobile-ad-dialog.component.css']
})
export class MobileAdDialogComponent implements OnInit {

  editBrandName;
  MobileAdImageFile;
  tempMobileAdImage;
  adPriority = 0;
  imageWidth;
  imageHeight;
  MobileAdForm: FormGroup;
  downloadURL: Observable<string>;
  MobileAdImageChanged: boolean = false;
  @ViewChild("MobileAdImage") MobileAdImage: ElementRef;

  constructor(
    private isActiveModal: IsActiveModal,
    private storage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.isActiveModal.data == null) {
      this.MobileAdForm = new FormGroup({
        MobileAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    } else {
      this.MobileAdImageFile = this.isActiveModal.data.image;
      this.tempMobileAdImage = this.isActiveModal.data.image;
      this.MobileAdForm = new FormGroup({
        MobileAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(this.isActiveModal.data.charges, [Validators.required])
      });
    }
  }

  onEditMobileChooseImage() {
    this.MobileAdImage.nativeElement.click();
  }

  onEditMobileFileChoosen(HLAdImageFile: any) {
    const self = this;
    this.MobileAdImageFile = HLAdImageFile.target.files[0];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.tempMobileAdImage = dataURL;
    };
    reader.readAsDataURL(HLAdImageFile.target.files[0]);
    this.MobileAdImageChanged = true;
  }

  onMobileAdFormSubmit(btn: IsButton) {
    console.log("formsubmit");
    if (this.MobileAdForm.valid) {
      btn.startLoading();
      let randomString =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      const filePath = "ads/" + randomString + "-" + this.MobileAdImageFile.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.MobileAdImageFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              let HLPriorityAdPostDto = {
                image: url || this.MobileAdImageFile,
                start: this.MobileAdForm.value.startTime,
                end: this.MobileAdForm.value.endTime,
                charges: this.MobileAdForm.value.charges
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

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IsActiveModal, IsButton } from "app/lib";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DataService } from "@app/shared/services/data.service";

@Component({
  selector: 'popup-ad-dialog',
  templateUrl: './popup-ad-dialog.component.html',
  styleUrls: ['./popup-ad-dialog.component.css']
})
export class PopupAdDialogComponent implements OnInit {

  editBrandName;
  PopupAdImageFile;
  tempPopupAdImage;
  adPriority = 0;
  imageWidth;
  imageHeight;
  PopupAdForm: FormGroup;
  downloadURL: Observable<string>;
  PopupAdImageChanged: boolean = false;
  @ViewChild("PopupAdImage") PopupAdImage: ElementRef;

  constructor(
    private isActiveModal: IsActiveModal,
    private storage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.isActiveModal.data == null) {
      this.PopupAdForm = new FormGroup({
        PopupAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    } else {
      this.PopupAdImageFile = this.isActiveModal.data.image;
      this.tempPopupAdImage = this.isActiveModal.data.image;
      this.PopupAdForm = new FormGroup({
        PopupAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(this.isActiveModal.data.charges, [Validators.required])
      });
    }
  }

  onEditPopupChooseImage() {
    this.PopupAdImage.nativeElement.click();
  }

  onEditPopupFileChoosen(HLAdImageFile: any) {
    const self = this;
    this.PopupAdImageFile = HLAdImageFile.target.files[0];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.tempPopupAdImage = dataURL;
    };
    reader.readAsDataURL(HLAdImageFile.target.files[0]);
    this.PopupAdImageChanged = true;
  }

  onPopupAdFormSubmit(btn: IsButton) {
    console.log("formsubmit");
    if (this.PopupAdForm.valid) {
      btn.startLoading();
      let randomString =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      const filePath = "ads/" + randomString + "-" + this.PopupAdImageFile.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.PopupAdImageFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              let HLPriorityAdPostDto = {
                image: url || this.PopupAdImageFile,
                start: this.PopupAdForm.value.startTime,
                end: this.PopupAdForm.value.endTime,
                charges: this.PopupAdForm.value.charges
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

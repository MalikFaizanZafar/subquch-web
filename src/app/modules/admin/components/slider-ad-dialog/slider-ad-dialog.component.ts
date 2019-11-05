import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IsActiveModal, IsButton } from "app/lib";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DataService } from "@app/shared/services/data.service";

@Component({
  selector: 'slider-ad-dialog',
  templateUrl: './slider-ad-dialog.component.html',
  styleUrls: ['./slider-ad-dialog.component.css']
})
export class SliderAdDialogComponent implements OnInit {

  editBrandName;
  SliderAdImageFile;
  tempSliderAdImage;
  adPriority = 0;
  imageWidth;
  imageHeight;
  SliderAdForm: FormGroup;
  downloadURL: Observable<string>;
  SliderAdImageChanged: boolean = false;
  @ViewChild("SliderAdImage") SliderAdImage: ElementRef;

  constructor(
    private isActiveModal: IsActiveModal,
    private storage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.isActiveModal.data == null) {
      this.SliderAdForm = new FormGroup({
        SliderAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(null, [Validators.required])
      });
    } else {
      this.SliderAdImageFile = this.isActiveModal.data.image;
      this.tempSliderAdImage = this.isActiveModal.data.image;
      this.SliderAdForm = new FormGroup({
        SliderAdImage: new FormControl(null),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        category: new FormControl("LOW"),
        charges: new FormControl(this.isActiveModal.data.charges, [Validators.required])
      });
    }
  }

  onEditSliderChooseImage() {
    this.SliderAdImage.nativeElement.click();
  }

  onEditSliderFileChoosen(HLAdImageFile: any) {
    const self = this;
    this.SliderAdImageFile = HLAdImageFile.target.files[0];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      self.tempSliderAdImage = dataURL;
    };
    reader.readAsDataURL(HLAdImageFile.target.files[0]);
    this.SliderAdImageChanged = true;
  }

  onSliderAdFormSubmit(btn: IsButton) {
    console.log("formsubmit");
    if (this.SliderAdForm.valid) {
      btn.startLoading();
      let randomString =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      const filePath = "ads/" + randomString + "-" + this.SliderAdImageFile.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.SliderAdImageFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              let HLPriorityAdPostDto = {
                image: url || this.SliderAdImageFile,
                start: this.SliderAdForm.value.startTime,
                end: this.SliderAdForm.value.endTime,
                charges: this.SliderAdForm.value.charges
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

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BuisnessImageModel } from "../../models/buisness.model";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SliderService } from "../../services/image-slider.service";
import { IsButton } from "app/lib";

@Component({
  selector: "slider-image",
  templateUrl: "./slider-image.component.html",
  styleUrls: ["./slider-image.component.css"]
})
export class SliderImageComponent implements OnInit {
  sliderImage: BuisnessImageModel = {
    id: 0,
    imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
    edited: false
  };
  sliderImages: BuisnessImageModel[] = [
    {
      id: 1,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      edited: false
    }
  ];
  imagesPreviousLength: number;
  selectedIndex: number = null;
  newImages: number = 0;
  addMoreBtnDisabled: boolean = true;
  downloadURL: Observable<string>;
  @ViewChild("imagePicker") imagePicker: ElementRef;
  constructor(private storage: AngularFireStorage, private sliderService: SliderService) {}

  ngOnInit() {
    this.sliderService.getImages().subscribe(res => {
      this.sliderImages = res.map(obj=> ({ ...obj, edited: false }));
      this.imagesPreviousLength = this.sliderImages.length;
    })
  }

  imageSelectHandler(index: number) {
    this.selectedIndex = index;
    this.imagePicker.nativeElement.click();
  }

  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    const self = this;
    if (this.selectedIndex > -1) {
      reader.onload = function() {
        var dataURL = reader.result;
        self.sliderImages[self.selectedIndex].imageUrl = String(dataURL);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      self.sliderImages[self.selectedIndex].file = fileInput.target.files[0];
    } else {
      reader.onload = function() {
        var dataURL = reader.result;
        self.sliderImage.imageUrl = String(dataURL);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      self.sliderImage.file = fileInput.target.files[0];
      this.addMoreBtnDisabled = false;
    }
  }
  onAddImage() {
    this.newImages++;
    this.sliderImages.push({
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      edited: false
    });
  }

  deleteImageHandler(index: number) {
    this.sliderService.deleteImage(this.sliderImages[index].id).subscribe(res => {
      this.sliderImages.splice(index, 1);
    })
  }
  onSaveHandler(btn: IsButton) {
    btn.startLoading();
    let imagesList = []
    console.log("this.sliderImages : ", this.sliderImages)
    this.sliderImages.map((image, i) => {
      if (image.file != undefined) {
        console.log("iFFFFFFFFF")
        let randomString =
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15);
        const filePath = "slider-images/" + randomString + "-" + image.file.name;
        console.log("filePath ", filePath)
        const fileRef = this.storage.ref(filePath);
        console.log("fileRef ", fileRef)
        const task = this.storage.upload(filePath, image.file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                console.log("url ......... ", url)
                this.sliderService.saveImage(url).subscribe(res => {
                  this.sliderImages[i] = {...res, edited: false};
                })
              });
            })
          )
          .subscribe();
      }else {
        // btn.stopLoading()
      }
      btn.stopLoading()
    });
  }
}

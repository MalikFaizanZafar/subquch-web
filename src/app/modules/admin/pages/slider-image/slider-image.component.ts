import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BuisnessImageModel } from "../../models/buisness.model";
import { IsActiveModal } from "app/lib";

@Component({
  selector: "slider-image",
  templateUrl: "./slider-image.component.html",
  styleUrls: ["./slider-image.component.css"]
})
export class SliderImageComponent implements OnInit {
  bannerImage: BuisnessImageModel = {
    id: 0,
    imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
    banner: true
  };
  buisnessImages: BuisnessImageModel[] = [
    {
      id: 1,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    }
  ];
  selectedIndex: number = null;
  @ViewChild("imagePicker") imagePicker: ElementRef;
  constructor() {}

  ngOnInit() {}

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
        self.buisnessImages[self.selectedIndex].imageUrl = String(dataURL);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      self.buisnessImages[self.selectedIndex].file = fileInput.target.files[0];
    } else {
      reader.onload = function() {
        var dataURL = reader.result;
        self.bannerImage.imageUrl = String(dataURL);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      self.bannerImage.file = fileInput.target.files[0];
    }
  }
  onAddImage() {
    this.buisnessImages.push({
      id: 1,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    });
  }
}

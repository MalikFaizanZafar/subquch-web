import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BuisnessImageModel } from "../../models/buisness.model";
import { IsActiveModal } from "app/lib";

@Component({
  selector: "edit-buisness-dialog",
  templateUrl: "./edit-buisness-dialog.component.html",
  styleUrls: ["./edit-buisness-dialog.component.css"]
})
export class EditBuisnessDialogComponent implements OnInit {
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
    },
    {
      id: 2,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    },
    {
      id: 3,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    }
  ];
  selectedIndex: number = null;
  @ViewChild("imagePicker") imagePicker: ElementRef;
  constructor(private isActiveModal: IsActiveModal) {}

  ngOnInit() {
    this.buisnessImages =  this.isActiveModal.data;
    console.log("this.isActiveModal.data : ", this.isActiveModal.data)
    this.bannerImage = this.buisnessImages.filter(i => i.banner == true)[0]
    this.buisnessImages = this.buisnessImages.filter(i => i.banner != true)
  }

  imageSelectHandler(index: number) {
    this.selectedIndex = index;
    this.imagePicker.nativeElement.click();
  }

  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    const self = this;
    if(this.selectedIndex > -1){
      reader.onload = function() {
        var dataURL = reader.result;
        self.buisnessImages[self.selectedIndex].imageUrl = String(dataURL);
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      self.buisnessImages[self.selectedIndex].file = fileInput.target.files[0];
    }else {
      reader.onload = function() {
        var dataURL = reader.result;
        self.bannerImage.imageUrl = String(dataURL);
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      self.bannerImage.file = fileInput.target.files[0];
    }
  }
  onAddImage(){
    this.buisnessImages.push({
      id: 1,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    })
  }
  onSaveHandler(){
    this.isActiveModal.close({images: [this.bannerImage, ...this.buisnessImages]})
  }
}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BuisnessImageModel } from "../../models/buisness.model";

@Component({
  selector: "add-buisness-dialog",
  templateUrl: "./add-buisness-dialog.component.html",
  styleUrls: ["./add-buisness-dialog.component.css"]
})
export class AddBuisnessDialogComponent implements OnInit {
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
    },
    {
      id: 4,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    },
    {
      id: 5,
      imageUrl: "http://silkbrassband.co.uk/images/no-image-selected.png",
      banner: false
    },
    {
      id: 6,
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
    reader.onload = function() {
      var dataURL = reader.result;
      if(self.selectedIndex > -1){
        self.buisnessImages[self.selectedIndex].imageUrl = String(dataURL);
      }else {
        self.bannerImage.imageUrl = String(dataURL);
      }
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    // this.buisnessService.storeBuisnessImages(blob)
  }
}

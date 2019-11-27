import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: "root" })
export class SliderService {
  baseURL: string = `${baseUrl}/images`;
  constructor(private http: HttpClient) {}

  saveImages(imagesList: string[]) {
    console.log("imageUrl : ", imagesList);
    return this.http.post<any>(`${this.baseURL}`, { images: imagesList });
  }

  saveImage(image: string) {
    return this.http.post<any>(`${this.baseURL}`, { image: image });
  }

  getImages(){
    return this.http.get<any>(`${this.baseURL}`);
  }

  deleteImage( id : number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}

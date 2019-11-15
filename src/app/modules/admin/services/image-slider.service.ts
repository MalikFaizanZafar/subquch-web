import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable()
export class SliderService {
  baseURL : string = `${baseUrl}/images`;
  constructor( private http : HttpClient){}

  saveImage(image:any){
    console.log("image is : ", image)
  }
}
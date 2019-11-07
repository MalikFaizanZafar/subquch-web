import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { BuisnessModel } from "../models/buisness.model";


const baseUrl = environment.baseUrl;
@Injectable()
export class BuisnessService {
  baseURL: string = `${baseUrl}`;

  constructor(private http: HttpClient) {}

  getBuisnesses(): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(`${this.baseURL}/buisness`, {
      headers
    });
  }

  addBuisness(buisness : BuisnessModel): Observable<any>{
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.post<any>(`${this.baseURL}/buisness`, buisness, {
      headers
    });
  }
}

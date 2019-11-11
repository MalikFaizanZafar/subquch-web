import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from "environments/environment";
import { BuisnessModel } from "../models/buisness.model";

const baseUrl = environment.baseUrl;
@Injectable()
export class BuisnessService {
  baseURL: string = `${baseUrl}`;
  downloadURL: Observable<string>;

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  getBuisnesses(): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(`${this.baseURL}/buisness`, {
      headers
    });
  }

  searchBuisnesses(key: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(`${this.baseURL}/buisness?title=${key}`, {
      headers
    });
  }

  getBuisness(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(`${this.baseURL}/buisness/${id}`, {
      headers
    });
  }
  deleteBuisness(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.delete<any>(`${this.baseURL}/buisness/${id}`, {
      headers
    });
  }

  addBuisness(buisness: BuisnessModel): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.post<any>(`${this.baseURL}/buisness`, buisness, {
      headers
    });
  }

  editBuisness(buisness: BuisnessModel, id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.put<any>(`${this.baseURL}/buisness/${id}`, buisness, {
      headers
    });
  }

  storeBuisnessImages(imageBlob: any) {
    let imageStorageUrl: String = '';
    let randomString =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const filePath = "projects/" + randomString;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imageBlob);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            imageStorageUrl = url;
            console.log("url is :", url)
          });
        })
      )
      .subscribe();
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";


const baseUrl = environment.baseUrl;
@Injectable()
export class FranchisesService {
  baseURL: string = `${baseUrl}/api`;

  constructor(private http: HttpClient) {}

  getFranchises(page: number, size: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(`${this.baseURL}/auth/franchises?page=${page}&size=${size}`, {
      headers
    });
  }

  getFranchiseContacts(id: number) : Observable<any>{
    return this.http.get<any>(`${this.baseURL}/auth/franchise/contact/${id}`);
  }

  setFranchiseActivation(id: number, active: boolean){
    return this.http.get<any>(`${this.baseURL}/auth/franchise/activation/${id}?active=${active}`);
  }
}

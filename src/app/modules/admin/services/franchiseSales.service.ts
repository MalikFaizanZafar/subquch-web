import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

const baseUrl = environment.baseUrl;
@Injectable()
export class FranchiseSalesService {
  baseURL: string = `${baseUrl}/api`;

  constructor(private http: HttpClient) {}

  getFranchiseSales(
    id: number,
    fromDate: string,
    toDate: string
  ): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(
      `${this.baseURL}/sales/${id}?start=${fromDate}&end=${toDate}`,
      {
        headers
      }
    );
  }
  getBrandSales(brandId: number, fromDate: string, toDate: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(
      `${this.baseURL}/sales/brand/${brandId}?start=${fromDate}&end=${toDate}`,
      {
        headers
      }
    );
  }
  getAllFranchisesSales(fromDate: string, toDate: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("Authorization");
    headers = headers.append("Authorization", token);
    return this.http.get<any>(
      `${this.baseURL}/sales?start=${fromDate}&end=${toDate}`,
      {
        headers
      }
    );
  }
}

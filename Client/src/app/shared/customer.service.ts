import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getCustomerList(){
    return this.http.get(this.apiUrl + '/Customers').toPromise();
  }
}

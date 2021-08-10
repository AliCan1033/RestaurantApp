import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItemList(){
    return this.http.get(this.apiUrl + '/Items').toPromise();
  }
}

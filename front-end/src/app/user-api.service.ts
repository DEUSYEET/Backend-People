import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }
  public getUsers() {
    return this.httpClient.get('http://localhost:3001/api?seed=1&results=500');
    // return this.httpClient.get('https://randomuser.me/api');
  }

}

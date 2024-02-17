import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  apiURL = 'https://api.github.com';
  constructor(private http: HttpClient) {}

  //API call to get user information
  getUser(userName: string) {
    return this.http.get<User>(this.apiURL + '/users/' + userName);
  }
}

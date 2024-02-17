import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Repo } from './interfaces/repo';

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

  //API call to get all repositories related to user
  getAllRepositories(userName: string, pageNumber: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('page', pageNumber);
    searchParams = searchParams.append('per_page', 10);
    return this.http.get<Repo[]>(
      this.apiURL + '/users/' + userName + '/repos',

      {
        params: searchParams,
        observe: 'response'
      }
    );
  }
}

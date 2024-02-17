import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userName = '';
  resultName = '';
  bio = '';
  avatar = '';
  repositories = 0;
  followers = 0;
  following = 0;
  location = '';
  apiSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private service: GithubService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = params['name'];
    });
    this.apiSubscription = this.service.getUser(this.userName).subscribe({
      next: (res) => {
        this.resultName = res.name;
        this.bio = res.bio;
        this.avatar = res.avatar_url;
        this.repositories = res.public_repos;
        this.followers = res.followers;
        this.following = res.following;
        this.location = res.location;
      }
    });
  }
}

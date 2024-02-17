import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../github.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loading = true; //handles loader
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
    private service: GithubService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    //get the query params from URL
    this.route.queryParams.subscribe((params) => {
      this.userName = params['name'];
    });

    //make API call to get user details
    this.apiSubscription = this.service.getUser(this.userName).subscribe({
      next: (res) => {
        this.loading = false;
        this.resultName = res.name;
        this.bio = res.bio;
        this.avatar = res.avatar_url;
        this.repositories = res.public_repos;
        this.followers = res.followers;
        this.following = res.following;
        this.location = res.location;
      },
      error: (err) => {
        this._router.navigate(['../']);
        console.log(err);
        if (err.status === 404) {
          this.snackBar.open('User not found', 'Dismiss', {
            duration: 5000
          });
        } else {
          this.snackBar.open('Error fetching Data', 'Dismiss', {
            duration: 5000
          });
        }
      }
    });
  }

  //function to get all the repositories belonging to the user
  getRepositories() {
    this._router.navigate(['./repositories'], {
      queryParams: {
        name: this.userName,
        repoCount: this.repositories
      },
      queryParamsHandling: 'merge'
    });
  }

  //unsubscribe when switching component
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}

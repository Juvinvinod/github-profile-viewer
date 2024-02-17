import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GithubService } from '../github.service';
import { Repo } from '../interfaces/repo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css'
})
export class RepositoryListComponent implements OnInit, AfterViewInit {
  loading = true;
  displayedColumns: string[] = ['Repository', 'Description', 'Topics'];
  apiSubscription!: Subscription;
  dataSource!: MatTableDataSource<Repo>;
  userName = '';
  totalPages = 0;
  pageNumber = 1;
  reposPerPage = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private service: GithubService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = params['name'];
      this.totalPages = params['repoCount'];
    });
    this.apiSubscription = this.service
      .getAllRepositories(this.userName, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.body) {
            this.dataSource = new MatTableDataSource<Repo>(res.body);
          }
        },
        error: () => {
          this.snackBar.open('Error fetching Data', 'Dismiss', {
            duration: 5000
          });
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageNumber = pageEvent.pageIndex + 1;
    this.apiSubscription = this.service
      .getAllRepositories(this.userName, this.pageNumber)
      .subscribe({
        next: (res) => {
          if (res.body) {
            this.dataSource = new MatTableDataSource<Repo>(res.body);
          }
        },
        error: () => {
          this.snackBar.open('Error fetching Data', 'Dismiss', {
            duration: 5000
          });
        }
      });
  }

  goBack() {
    this._router.navigate(['./profile'], {
      queryParams: {
        name: this.userName
      },
      queryParamsHandling: 'merge'
    });
  }
}

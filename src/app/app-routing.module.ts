import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: '',
    component: SearchBarComponent
  },
  {
    path: 'repositories',
    component: RepositoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

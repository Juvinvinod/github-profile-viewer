import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor() {}
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  }); //using reactive forms to get username

  //function to extract userName and redirect to profile page
  onSubmit() {
    if (this.userForm.valid) {
      const searchName = this.userForm.controls.name.value; // store the form value in a variable
    }
  }
}

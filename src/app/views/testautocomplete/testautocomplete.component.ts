import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

export interface User {
  name: string;
}


@Component({
  selector: 'app-testautocomplete',
  templateUrl: './testautocomplete.component.html',
  styleUrls: ['./testautocomplete.component.css']
})
export class TestautocompleteComponent implements OnInit {

  selectedUser: User

  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'},
    {name: 'Marewaf'},
    {name: 'Shedy'},
    {name: 'Igosqr'}
  ];
  filteredOptions: Observable<User[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice()),
      );
  }

  displayFn(user: User): string {

    return user && user.name ? user.name : '';

  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmit(){
    console.log(this.myControl.value);
  }
}

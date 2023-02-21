import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucess-create-class-dialog',
  templateUrl: './sucess-create-class-dialog.component.html',
  styleUrls: ['./sucess-create-class-dialog.component.css']
})
export class SucessCreateClassDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    window.location.href="/create-class" 
  }

}

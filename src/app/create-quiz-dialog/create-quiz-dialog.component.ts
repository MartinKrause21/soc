import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-quiz-dialog',
  templateUrl: './create-quiz-dialog.component.html',
  styleUrls: ['./create-quiz-dialog.component.css']
})
export class CreateQuizDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    window.location.href="/create-quiz" 
  }
}

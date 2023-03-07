import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-quiz-dialog',
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrls: ['./edit-quiz-dialog.component.css']
})
export class EditQuizDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    location.reload();
  }

}

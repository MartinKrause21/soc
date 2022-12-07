import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  constructor(
    private dialog : MatDialog, 
  ) { }

  location = window.location.href;

  ngOnInit(): void {
    console.log( window.location.href);
  }

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

}

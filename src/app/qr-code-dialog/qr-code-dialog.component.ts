import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.css']
})
export class QrCodeDialogComponent implements OnInit {

  constructor() { }

  location = window.location.href;

  ngOnInit(): void {
    console.log( window.location.href);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-convertor',
  templateUrl: './qr-code-convertor.component.html',
  styleUrls: ['./qr-code-convertor.component.css']
})
export class QrCodeConvertorComponent implements OnInit {

  constructor() { }

  public QRcodeText:string;

  ngOnInit(): void {
  }

}

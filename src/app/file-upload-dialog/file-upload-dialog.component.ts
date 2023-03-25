import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {

  constructor(
    private cookies: CookieService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getImage(this.imageId);
  }

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageId: number;

  getImage(imageId : number) {

    console.log("zavolana get image");
    
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.http.get('https://teach-quiz.herokuapp.com/image/get/' + imageId)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    }


}

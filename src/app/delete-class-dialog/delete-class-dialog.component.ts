import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-delete-class-dialog',
  templateUrl: './delete-class-dialog.component.html',
  styleUrls: ['./delete-class-dialog.component.css']
})
export class DeleteClassDialogComponent implements OnInit {

  constructor(
    private authService : AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  className: string = this.data.className;

  delete(className : string) {
    this.authService.deleteClass(className).subscribe(() => {
      console.log('Success!');
      location.reload()
    }, error => {
      console.error('Error:' , error);
    });
  }

}

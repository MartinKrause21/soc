import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-delete-admin-dialog',
  templateUrl: './delete-admin-dialog.component.html',
  styleUrls: ['./delete-admin-dialog.component.css']
})
export class DeleteAdminDialogComponent implements OnInit {

  constructor(
    private quizService : QuizService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  adminName: string = this.data.adminName;

  delete(adminName : string) {
    this.quizService.deleteAdmin(adminName).subscribe(() => {
      console.log('Success!');
      location.reload()
    }, error => {
      console.error('Error:' , error);
    });
  }


}

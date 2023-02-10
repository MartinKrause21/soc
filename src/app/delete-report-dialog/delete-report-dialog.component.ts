import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-delete-report-dialog',
  templateUrl: './delete-report-dialog.component.html',
  styleUrls: ['./delete-report-dialog.component.css']
})
export class DeleteReportDialogComponent implements OnInit {

  constructor(
    private quizService : QuizService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  reportId: number = this.data.userName;

  delete(reportId : number) {
    this.quizService.deleteReport(reportId).subscribe(() => {
      console.log('Success!');
      location.reload()
    }, error => {
      console.error('Error:' , error);
    });
  }

}

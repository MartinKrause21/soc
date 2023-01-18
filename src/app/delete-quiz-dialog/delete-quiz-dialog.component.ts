import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-delete-quiz-dialog',
  templateUrl: './delete-quiz-dialog.component.html',
  styleUrls: ['./delete-quiz-dialog.component.css']
})
export class DeleteQuizDialogComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute, 
    private quizService : QuizService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  quizName: string = this.data.quizName;

  delete(quizName : string) {
    this.quizService.deleteQuiz(quizName).subscribe(() => {
      console.log('Success!');
      location.reload()
    }, error => {
      console.error('Error:' , error);
    });
  }

}

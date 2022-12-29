import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizUsers } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './admin-quiz-detail.component.html',
  styleUrls: ['./admin-quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
  ) { }

  public quizUsers : quizUsers [];
  id: string

  ngOnInit(): void {

    this.id =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.id).subscribe(quizUsers => { 
        this.quizUsers = quizUsers;
        console.log(quizUsers);
      });
    }

}

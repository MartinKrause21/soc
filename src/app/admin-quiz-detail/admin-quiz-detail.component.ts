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
  contentLoaded: boolean = true;
  username: string;

  public quizUsers : quizUsers [];
  quizName: string;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.quizName).subscribe(quizUsers => { 
        this.quizUsers = quizUsers;
        this.contentLoaded = false;
        console.log(quizUsers);
      });
    }

}

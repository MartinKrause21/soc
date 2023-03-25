import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resultQuestion, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-admin-user-detail2',
  templateUrl: './admin-user-detail2.component.html',
  styleUrls: ['./admin-user-detail2.component.css']
})
export class AdminUserDetail2Component implements OnInit {

  username : string
  score: number;
  quizName: string
  percentage: number;

  public resultQuiz : any [] = [];
  public resultQuestionList : resultQuestion [] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
    private http: HttpClient,
  ) { }

  resultQuizId: number;
  panelOpenState = false;
  borderColor:string = 'none';
  contentLoaded: boolean = true;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageId: number;

  ngOnInit(): void {

    this.resultQuizId =Number(this.route.snapshot.paramMap.get('id'));
    //this.quizName =String(this.route.snapshot.paramMap.get('id'));
    this.username =String(this.route.snapshot.paramMap.get('username'));
    //this.quizName = this.resultQuiz[0].resultAnswer;


    this.quizService.getUserDetailsForQuiz(this.resultQuizId, this.username).subscribe(resultt => {
      this.quizName = resultt.resultQuiz.quizName;
      this.resultQuiz[0] = resultt.resultQuiz.questionList;
      this.score = resultt.score;
      this.percentage = resultt.percentage;
      this.contentLoaded = false;

      for (let i = 0; i < this.resultQuiz[0].length; i++) { // use a for loop to iterate over the resultQuiz array
        const imageId = this.resultQuiz[0][i].image.id;
        this.getImage(imageId, i); // pass the current index to the getImage function
      }
    });

  }

  imageMap: { [index: number]: string } = {};

  getImage(imageId: number, questionIndex: number) { // add the questionIndex parameter
    this.http.get('https://teach-quiz.herokuapp.com/image/get/' + imageId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.imageMap[questionIndex] = this.retrievedImage;
        }
      );
  }

}



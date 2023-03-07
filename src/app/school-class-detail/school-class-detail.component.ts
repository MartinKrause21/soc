import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';
import { schoolUsers } from 'src/user';

@Component({
  selector: 'app-school-class-detail',
  templateUrl: './school-class-detail.component.html',
  styleUrls: ['./school-class-detail.component.css']
})
export class SchoolClassDetailComponent implements OnInit {


  contentLoaded: boolean = true;
  classNumber: string;
  schoolName: string;

  public schoolUsers :  schoolUsers[];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.classNumber =String(this.route.snapshot.paramMap.get('classNumber'));  
    this.schoolName =String(this.route.snapshot.paramMap.get('schoolName'));

    this.quizService.getAllUsersForSchool(this.schoolName, this.classNumber).subscribe(response => {
      this.schoolUsers = response;
      this.contentLoaded =false
      console.log(response);
    });
  
  }

}

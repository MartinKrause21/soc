import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css']
})
export class QuizOverviewComponent implements OnInit {

  constructor(
    private cookies : CookieService
  ) { }

  role : string

  ngOnInit(): void {
    this.role = this.cookies.get('role');
  }

}

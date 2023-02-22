import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { allTeacherQuizes } from 'src/quiz';

@Component({
  selector: 'app-all-admin-quizzes-s',
  templateUrl: './all-admin-quizzes-s.component.html',
  styleUrls: ['./all-admin-quizzes-s.component.css']
})
export class AllAdminQuizzesSComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  teacherName:string
  allTeacherQuizes: allTeacherQuizes[];

  ngOnInit(): void {
    this.teacherName =String(this.route.snapshot.paramMap.get('teacherName'));

    this.authService.getAllAdminQuizzesSupervisor(this.teacherName).subscribe(response => {
      this.allTeacherQuizes = response;
      console.log(response);
    });
  }

}

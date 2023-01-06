import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  username : string
  quizName: string

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

}

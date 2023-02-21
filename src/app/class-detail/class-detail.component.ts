import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { classUsers } from 'src/user';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  className:string
  classUsers: classUsers[];

  ngOnInit(): void {

    this.className =String(this.route.snapshot.paramMap.get('className'));

    this.authService.getAllClassUsers(this.className).subscribe(response => {
      this.classUsers = response;
      console.log(response);
    });
  }

}

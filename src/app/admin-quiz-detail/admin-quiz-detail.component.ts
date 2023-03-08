import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizUsers } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { allSchoolNames } from 'src/user';

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './admin-quiz-detail.component.html',
  styleUrls: ['./admin-quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {

  @Input() resultQuizIds: any[];
  options: any[] = [];

  panelOpenState:boolean = false;

  schoolNameSelect: string;
  nullValue: string ;

  contentLoaded: boolean = true;
  username: string;

  classes: any = [];
  allSchoolNames: allSchoolNames[] = [] ;
  public quizzUsers :  any[];
  public quizUsers :  quizUsers[];
  public usersBySchool :  quizUsers[];
  originalUsers : quizUsers [];
  quizName: string;
  userIds: number[];
  filteredUsers: any[] = [];
  classOption: any;
  myControl = new FormControl('');

  classNumber: string = '';
   schoolName: string;

  users$: Observable<quizUsers[]>;
  filteredOptions: Observable<string[]>;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {    this.originalUsers = this.quizUsers; }

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.quizName).subscribe(response => {
      this.quizUsers = response;
      //this.quizzUsers = response;
      this.filterUsers();

      this.originalUsers = this.quizUsers;
      this.contentLoaded =false
      console.log(response);
      
      // this.resultQuizIds = this.dataService.getResultQuizIds();
      // this.quizzUsers = this.quizzUsers.map(user => {
      //   return {
      //     username: user.username,
      //     id: this.resultQuizIds[this.quizzUsers.indexOf(user)]
      //   }
      // });
      
    });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.quizService.getAllUsersBySchool(this.schoolNameSelect).subscribe(response => {
      this.usersBySchool = response;
      console.log(response);
    });

    this.authService.getAllSchoolNames().subscribe((response: allSchoolNames[]) => {
      this.allSchoolNames = response;
      console.log(this.allSchoolNames);
      
      this.options = this.allSchoolNames;
      console.log(this.options);
      
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterUsers() {
    if (!this.schoolName && !this.classNumber) {
      this.filteredUsers = this.quizUsers;
    }  
     else{
      this.filteredUsers = this.quizUsers.filter(user => {
        console.log("jedan");
        return user.schoolName === this.schoolName && user.classNumber === this.classNumber;
      });
    }
  }

  areFiltredUsers: Boolean;

  filterUsersBySchool() {
     console.log("jjj");
     this.areFiltredUsers = false;
      this.classes = [];
      
      if (!this.schoolName && !this.classNumber) {
        this.filteredUsers = this.quizUsers;
      }  
       else{
        this.filteredUsers = this.quizUsers.filter(user => {
          console.log(this.schoolName + "asdddd");
          this.areFiltredUsers = true;
      
          return user.schoolName === this.schoolName;
        });
      } if(this.areFiltredUsers == true) {
        for (let i = 0; i < this.filteredUsers.length; i++) {
          const classNumber = this.filteredUsers[i].classNumber;
          
          if (!this.classes.includes(classNumber)) {
            this.classes.push(classNumber);
            console.log("sven" + this.classes);
          }
        }
      }
    }

    onInputChanged() {
      this.filterUsers();
    }

  searchTerm: string;

  searchUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.originalUsers;
    } else {
      this.filteredUsers = this.filteredUsers.filter(user => user.username.includes(this.searchTerm));
    }
  }

  sortData(sort: Sort) {
    const data = this.filteredUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredUsers = data;
      return;
    }

    this.filteredUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.username, b.username, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);

        default:
          return 0;
      }
    });
  }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { allTeacherQuizes, allUserQuizes } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';
import { allSchoolNames, allUsers, userClass } from 'src/user';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
  ) { }

   allUsers: allUsers[];
   allTeacherQuizes : allTeacherQuizes[]
   allSchoolNames: allSchoolNames[] = [] ;

   myControl = new FormControl('');
    options: any[] = [];
    classOption: any;
    filteredOptions: Observable<string[]>;
    classes: any = [];


   quizName:string
   usernames:string[] = []

   filteredUsers: any[] = [];

   classNumber: string = '';
   schoolName: string;

   classNameTouched = false;
   checked = false;
   quizNameTouched = false;
   usernamesTouched = false;

   createClassModel = new userClass( '', '', []);

    ngOnInit(): void {

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.authService.getAllUsersForSupervisor().subscribe(allUsers => {
        this.allUsers = allUsers;
        this.filterUsers();
        console.log(this.allUsers); 
      });

      this.quizService.getAllTeacherQuizes().subscribe(response => {
        this.allTeacherQuizes = response;
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
        this.filteredUsers = this.allUsers;
      }  
       else{
        this.filteredUsers = this.allUsers.filter(user => {
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
        this.filteredUsers = this.allUsers;
      }  
       else{
        this.filteredUsers = this.allUsers.filter(user => {
          console.log("fvaan");
          this.areFiltredUsers = true;
          return user.schoolName === this.schoolName;
        });
      }
      for (let i = 0; i < this.filteredUsers.length; i++) {
        const classNumber = this.filteredUsers[i].classNumber;
        
        if (!this.classes.includes(classNumber) && this.areFiltredUsers == true ) {
          this.classes.push(classNumber);
          console.log("sven" + this.classes);
        }
      }
    }

    onInputChanged() {
      this.filterUsers();
    }

  createClass() {
    this.authService.createClass(this.quizName, this.createClassModel.className, this.usernames);
    console.log(this.quizName, this.createClassModel.className, this.usernames);
  }

}
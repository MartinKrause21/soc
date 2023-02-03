import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question, Quiz } from 'src/quiz';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  editQuizForm: FormGroup; 

  questionList : Question

  constructor() { }

  ngOnInit(): void {
  }

  editQuiz(){
    
  }

}

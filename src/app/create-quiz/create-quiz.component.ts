
import { Component } from '@angular/core';  
import { FormGroup, FormControl, FormArray, FormBuilder, Form } from '@angular/forms'  
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { QuizService } from 'src/services/quiz.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1500,
  hideDelay: 0,
  touchendHideDelay: 1000,
};
    
@Component({  
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
})  
export class CreateQuizComponent  {   
    
  quizForm: FormGroup;  
       
  constructor(
    private formBuilder:FormBuilder,
    private quizService: QuizService,
    ) {  
     
    this.quizForm = this.formBuilder.group({  
      name: '',  
      description: '',
      questionList: this.formBuilder.array([]) , 
    });
  }  
    
  get questionList() : FormArray {  
    return this.quizForm.controls["questionList"] as FormArray  
  }  

  answerList(questionIndex: number) :FormArray {
    //return this.quizForm.controls["answerList"] as FormArray 
    return this.questionList.controls [questionIndex].get("answerList") as FormArray
  }
     
  newQuestion(): FormGroup {  
    return this.formBuilder.group({  
      questionContent: '',   
      answerList: this.formBuilder.array([]) , 
    })  
  } 
  
  newAnswer(): FormGroup { 
    return this.formBuilder.group({  
      answerContent: ''   
    })  
  }  
     
  addQuestion() {  
    this.questionList.push(this.newQuestion());  
  } 
  removeQuestion(questionIndex:number) {  
    this.questionList.removeAt(questionIndex);  
  }  

  // -----------------------------------------------//  

  addAnswer(questionIndex:number) {  
    //this.answerList.push(this.newAnswer());  
    return this.answerList(questionIndex).push(this.newAnswer());
  }  
  removeAnswer(answerIndex:number, questionIndex:number) {  
    //this.answerList.removeAt(answerIndex);  
    return this.answerList(questionIndex).removeAt(answerIndex);
  }  
     
  onSubmit() {  
    this.quizService.addQuiz(this.quizForm.value);
    console.log(this.quizForm.value);  
    //console.log(this.questionList);
  }  

}

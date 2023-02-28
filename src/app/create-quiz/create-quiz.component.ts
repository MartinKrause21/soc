
import { Component, ElementRef, HostListener } from '@angular/core';  
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

  isSticky = false;
  ignoredCase:boolean = false;
  originalTop: number;

  ngAfterViewInit() {
    this.originalTop = this.el.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (offset > 290) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
    
  quizForm: FormGroup;  

  constructor(
    private formBuilder:FormBuilder,
    private quizService: QuizService,
    private el: ElementRef
    ) {  
     
    this.quizForm = this.formBuilder.group({  
      name: '',  
      description: '',
      ignoredCase: this.ignoredCase,
      questionList: this.formBuilder.array([]) , 
    }, {validators: [this.quizFormValidator]});
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
      answerContent: '', 
      correct: new FormControl(''),
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
    if (this.quizForm.value.questionList.length == 0) {
      alert("Please add at least one question");
      return;
    }
    if (this.quizForm.value.questionList[0].answerList.length == 0) {
      alert("Please add at least one answer for question ");
      return;
    }

    else {
    this.quizService.addQuiz(this.quizForm.value);
    console.log(this.quizForm.value);  
    }
  }  

  onToggleChange(checked: boolean) {
    this.ignoredCase = checked;
    this.quizForm.patchValue({
      ignoredCase: checked,
    });
  }

  quizFormValidator(form: FormGroup) {
    const questionList = form.controls['questionList'] as FormArray;
    if (questionList.length < 2) {
      return { 'atLeastTwoQuestions': true };
    }
    for (let i = 0; i < questionList.length; i++) {
      const answerList = questionList.controls[i].get('answerList') as FormArray;
      if (answerList.length === 0) {
        return { 'atLeastOneAnswer': true };
      }
    }
    return null;
  }

}

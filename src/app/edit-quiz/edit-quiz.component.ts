// import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Question, Quiz } from 'src/quiz';
// import { QuizService } from 'src/services/quiz.service';

// @Component({
//   selector: 'app-edit-quiz',
//   templateUrl: './edit-quiz.component.html',
//   styleUrls: ['./edit-quiz.component.css']
// })
// export class EditQuizComponent implements OnInit {

//   quiz : Quiz;
//   questionList: Question[];

//   isSticky = false
//   originalTop: number;

//   editQuizForm: FormGroup; 

//   quizName : string

//   quizForm: FormGroup;  

//   ngAfterViewInit() {
//     this.originalTop = this.el.nativeElement.offsetTop;
//   }

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

//     if (offset > 290) {
//       this.isSticky = true;
//     } else {
//       this.isSticky = false;
//     }
//   }

//   constructor(
//     private route: ActivatedRoute,
//     private quizService: QuizService,
//     private formBuilder:FormBuilder,
//     private el: ElementRef
//   ) { 
//     this.quizForm = this.formBuilder.group({  
//       name: '',  
//       description: '',
//       questionList: this.formBuilder.array([]) , 
//     });
//   }

//   ngOnInit(): void {
//     this.quizName = String(this.route.snapshot.paramMap.get('name'));

//     this.quizService.getQuiz(this.quizName).subscribe(response =>{
//       console.log(response);

//       this.quiz = response;
//       this.questionList = response.questionList;
//     })
//   }



//    newQuestion(): FormGroup {  
//     return this.formBuilder.group({  
//       questionContent: '',   
//       answerList: this.formBuilder.array([]) , 
//     })  
//   } 


//   editQuiz(){

//   }

// }



import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Form } from '@angular/forms'
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Question, Quiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1500,
  hideDelay: 0,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css'],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
})
export class EditQuizComponent implements OnInit {

  isSticky = false;
  originalTop: number;
  quizName: string;
  ignoredCase: boolean = false;

  quiz: Quiz
  questionListt: Question[];

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

  imageId: number;
  imageName : string;

  ngOnInit() {
    this.quizName = String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getQuiz(this.quizName).subscribe((data) => {
      this.quiz = data;
      this.quizForm.controls['name'].setValue(this.quiz.name);
      this.quizForm.controls['description'].setValue(this.quiz.description);
      console.log(data);

      if (data.questionList[0].image && data.questionList[0].image.id) {
        this.imageId = data.questionList[0].image.id;
        this.imageName = data.questionList[0].image.name;
      }


      const questionList = this.quizForm.controls['questionList'] as FormArray;
      this.quiz.questionList.forEach(question => {
        questionList.push(new FormGroup({
          questionContent: new FormControl(question.questionContent),
          idOfImage: new FormControl(question.image && question.image.id ? question.image.id : null),
          answerList: new FormArray([])
        }));
        const answerList = questionList.controls[questionList.length - 1].get('answerList') as FormArray;
        question.answerList.forEach(answer => {
          answerList.push(new FormGroup({
            answerContent: new FormControl(answer.answerContent),
            correct: new FormControl(answer.correct)
          }));
        });
      });
    });
  }


  quizForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {

    this.quizForm = this.formBuilder.group({
      name: '',
      description: '',
      ignoredCase: this.ignoredCase,
      questionList: this.formBuilder.array([]),

    });
  }

  get questionList(): FormArray {
    return this.quizForm.controls["questionList"] as FormArray
  }

  answerList(questionIndex: number): FormArray {
    //return this.quizForm.controls["answerList"] as FormArray 
    return this.questionList.controls[questionIndex].get("answerList") as FormArray
  }

  newQuestion(): FormGroup {
    return this.formBuilder.group({
      questionContent: '',
      //image: this.imageId,
      answerList: this.formBuilder.array([]),
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
  removeQuestion(questionIndex: number) {
    this.questionList.removeAt(questionIndex);
  }

  // -----------------------------------------------//  

  addAnswer(questionIndex: number) {
    //this.answerList.push(this.newAnswer());  
    return this.answerList(questionIndex).push(this.newAnswer());
  }
  removeAnswer(answerIndex: number, questionIndex: number) {
    //this.answerList.removeAt(answerIndex);  
    return this.answerList(questionIndex).removeAt(answerIndex);
  }


  editQuiz() {
    if (this.quizForm.value.questionList.length == 0) {
      alert("Please add at least one question");
      return;
    }
    if (this.quizForm.value.questionList[0].answerList.length == 0) {
      alert("Please add at least one answer for question ");
      return;
    }

    else {
      this.quizService.editQuiz(this.quizName, this.quizForm.value);
      console.log(this.quizForm.value);
    }
  }

  onToggleChange(checked: boolean) {
    this.ignoredCase = checked;
    this.quizForm.patchValue({
      ignoredCase: checked,
    });
  }

}



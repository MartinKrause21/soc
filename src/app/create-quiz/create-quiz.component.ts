
import { Component } from '@angular/core';  
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  
import { QuizService } from 'src/services/quiz.service';
    
@Component({  
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})  
export class CreateQuizComponent  {   
    
  productForm: FormGroup;  
     
  constructor(
    private fb:FormBuilder,
    private quizService: QuizService,
    ) {  
     
    this.productForm = this.fb.group({  
      name: '',  
      description: '',
      questionList: this.fb.array([]) ,  
    }); 
    
    this.productForm = this.fb.group({  
      content: '',   
    });  
  }  
    
  get questionList() : FormArray {  
    return this.productForm.controls["questionList"] as FormArray  
  }  
     
  newQuestion(): FormGroup {  
    return this.fb.group({  
      questionContent: '',  
      answerList: this.fb.array([]) ,  
    })  
  }  
     
  addQuestion() {  
    this.questionList.push(this.newQuestion());  
  }  
     
  removeQuestion(i:number) {  
    this.questionList.removeAt(i);  
  }  
     
  onSubmit() {  
    this.quizService.addQuiz(this.productForm.value);
    console.log(this.productForm.value);  
    console.log(this.questionList);
  }  

}

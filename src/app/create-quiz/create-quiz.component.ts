
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';  
import { FormGroup, FormControl, FormArray, FormBuilder, Form, Validators } from '@angular/forms'  
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';


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

  imageId: number;
  questionNumber: number;
  
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
    private el: ElementRef,
    private http: HttpClient,
    private cookies: CookieService,
    private dialog: MatDialog,
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
     
  newQuestion(index: number): FormGroup {  
    return this.formBuilder.group({  
      questionContent: '',  
      questionNumber: index, 
      imageId: this.imageId,
      //timeLimit: '',
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
    const questionIndex = this.questionList.length + 1;
    this.questionList.push(this.newQuestion(questionIndex));  
  }
  removeQuestion(questionIndex: number) {
    this.questionList.removeAt(questionIndex);
    for (let i = questionIndex; i < this.questionList.length; i++) {
      const questionNumberControl = this.questionList.controls[i].get('questionNumber');
      if (questionNumberControl) {
        questionNumberControl.setValue(i+1);
      }
    }
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
      //alert("Please add at least one question");
      return;
    }
    if (this.quizForm.value.questionList[0].answerList.length == 0) {
      //alert("Please add at least one answer for question ");
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

  //selectedFile: any | null = null;
  fileData: any;
  fileSelected: Record<number, boolean> = {};


  // onFileSelected(event: any, questionIndex: number) {
  //   const selectedFile = event.target.files[0];
  //   console.log(selectedFile);
  //   this.fileSelected[questionIndex] = true;
  //   // Do something with the selected file
  // }
  fileName:string;

  fileQuizUpload: any | null = null;

  public onFileChange(event: any, questionIndex: number) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.quizForm.patchValue({
          file: reader.result
        });

        this.fileQuizUpload = reader.result;
        console.log(this.quizForm.value, this.fileQuizUpload);
        
      };
      
      this.fileSelected[questionIndex] = true;
    }
  }

  // fd = new FormData();

  // onFileChange(event: any, questionIndex: number) {
  //   console.log(event);
  //   this.selectedFile = <File>event.target.files[0];
  //   this.fd.append('file', this.selectedFile, this.selectedFile.name);
  //   this.fileSelected[questionIndex] = true;
  //   console.log(this.quizForm.value);
  // }
 
  
  clearFileInput(questionIndex: number) {
    this.quizForm.get('questionList')?.get([questionIndex])?.get('file')?.setValue(null);
    this.fileSelected[questionIndex] = false;
  }

  extrasOpened: boolean[] = [];
  
  toggleExtras(questionIndex: number) {
    this.extrasOpened[questionIndex] = !this.extrasOpened[questionIndex];
  }

  // -----------------------------------------------//


  selectedFile: File;
  //fileSelected2 = false;
  formData = new FormData();

  onFileChange2(event: any, questionIndex:number) {
    // const file = event.target.files[0];
    // const formData = new FormData();
    // formData.append('image', file, file.name);
    // console.log(formData.get('image')); 

    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.fileSelected[questionIndex] = true;
  }

  onUpload(questionIndex: number) {
    console.log(this.selectedFile, "fileee");
  
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    this.http.post<number>('https://teach-quiz.herokuapp.com/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        console.log('Response:', response);
  
        if (response.body !== null) {
          const imageId = response.body;
          // get the existing question form group at the given index
          const questionFormGroup = (this.quizForm.get('questionList') as FormArray).at(questionIndex) as FormGroup;
          // update the imageId field
          questionFormGroup.patchValue({ imageId });
        }

      });
  }
  


}

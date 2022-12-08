// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create-quiz',
//   templateUrl: './create-quiz.component.html',
//   styleUrls: ['./create-quiz.component.css']
// })
// export class CreateQuizComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



import { Component } from '@angular/core';  
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  
    
@Component({  
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})  
export class CreateQuizComponent  {  
  name = 'Angular';  
    
  productForm: FormGroup;  
     
  constructor(private fb:FormBuilder) {  
     
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
  }  
    
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }  

}

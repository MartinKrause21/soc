import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'; 
import { EmailPasswordForGuest } from 'src/user';


@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent implements OnInit {

  model = new EmailPasswordForGuest( '', '');

  hide = true;
  hide2 = true;

  constructor() { }

  ngOnInit(): void {
  }

    
  onSubmit() {
    //this.loginService.login(this.model);
    console.log(this.model);
  }

}

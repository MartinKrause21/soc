
export class user {
  
    username: string;
    password: string;
    email: string;

   constructor(
      username: string,
      password: string,
      email: string,
   ) {  }
 
} 

export class userLogin {
  
   username: string;
   password: string;

  constructor(
     username: string,
     password: string,
  ) {  }

}

export class sentMail {
   email: any;

   constructor(
       email: any,
   ) {  }
}

export class resendMail {
   email: string;

   constructor(
       email: string,
   ) {  }
}

export class changePassword {
   password: string;

   constructor(
       password: string,
   ) {  }
}


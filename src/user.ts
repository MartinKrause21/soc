
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

export class reportUser {
    id: number;
    username: string;
    password: string;
    email: string;

   constructor(
      username: string,
      password: string,
      email: string,
      id: number
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

export class guest {
   username : string;
   password : string 
    
   constructor(
      username: string,
      password : string 
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
       password: string
   ) {  }
}

export class EmailPasswordForGuest {
   email: string;
   password: string;

   constructor(
       password: string,
       email: string
   ) {  }
}

export class sendSupport {
   problem: string;
   selected: string;

   constructor(
       problem: string,
       selected: string
   ) {  }
}

export class allAdmins {
   username: string;
   email: string;
   enabled: boolean;
   id: number;
   date: Date;

   constructor(
       username: string,
       email: string,
       enabled: boolean,
       date : Date,
   ) {  }
}

export class allUsers {
   username: string;
   email: string;
   enabled: boolean;
   id: number;
   date: Date;

   constructor(
       username: string,
       email: string,
       enabled: boolean,
       date : Date,
   ) {  }
}

export class allReports {
   id: number;
   message: string;
   reason: string;
   user: reportUser;
   constructor(
         id: number,
         message: string,
         reason: string,
         user: user,
      ) {  }
}


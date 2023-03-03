
export class user {
    username: string;
    password: string;
    email: string;
    classNumber: string;
    schoolName: string;

   constructor(
      username: string,
      password: string,
      classNumber: string,
      schoolName: string,
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
   classNumber: string;
   schoolName: string;
   id: number;
   date: Date;

   constructor(
       username: string,
       email: string,
       enabled: boolean,
       date : Date,
   ) {  }
}

export class allSchoolNames {
   toLowerCase() {
     throw new Error('Method not implemented.');
   }
   name: string;
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

export class userClass {
   quizName: string;
   className: string;
   usernames: any[];
   constructor(
      quizName: string,
      className: string,
      usernames: any[],
      ) {  }
}

export class classUsers {
   resultQuizId: number;
   username: string;
   date: Date;
   constructor(
      resultQuizId: number,
      username: string,
      date: Date,
      ) {  }
}


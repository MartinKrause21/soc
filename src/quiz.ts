import { type } from "os";

export interface Quiz {
    name: string; 
    ignoredCase:boolean;
    description: string; 
    questionList : Question[];
}

export interface Question {
    answered: unknown;
    image: Image;
    timeLimit: number;
    multipleChoice: boolean;
    questionContent: string;
    answerList: Answer[];
}

export interface Answer {
    answerContent: string; 
    content: string;
    correct: boolean;
}

export interface Image {
    id: number;
    name: string;
    type: string;
    imageData: any;
}


// --------------------------------


export interface resultQuiz {
    name: string; 
    description: string; 
    questionList : resultQuestion[];
    isFavourite: boolean;
}

export interface resultQuestion {
    questionContent: string;
    answerList: resultAnswer[];
}

export interface resultAnswer {
    answerContent: string; 
    content: string;
    correct: boolean;
}

export interface favouriteQuiz{
    quizName: String;
    favourite: boolean;
}

export class allTeacherQuizes {
    name: string;
    description: string;
    resultQuizIds: any[];
    isCopied: boolean;

    constructor(
        name: string,
        description: string,
        resultQuizIds: any[]
    ) {  }
}

export class TeacherQuizzesPercentage {
    quizName: string;
    percentage : number;

    constructor(
        quizName: string,
        percentage: number,
    ) {  }
}

export class allUserQuizes {
    name: string;
    id: number;
    description: string;
    creatorName: string;
    date : string;
    resultQuizId: any[];
    isFavourite: boolean;
    constructor(
        name: string,
        id : number,
        description: string,
        date: string,
        creatorName: string,
    ) {  }
}
export class quizUsers {
    username: string;
    resultQuizID: number;
    schoolName: string;
    classNumber: string;
    versionOfQuiz: number;
    date: string;

    constructor(
        username: string,
        date : Date,
    ) {  }
}
export class inputAnswer {
    answerContent: string;
    content: string; 
    correct: boolean;
    chosen: boolean;
    constructor(
        answerContent: string,
        correct: boolean,
        chosen: boolean,
    ) {  }
}

export class allFavouriteQuizzes {
    quizName: string;
    id : number;
    favourite: boolean;
    
    constructor(
        quizName: string,
        id: number,
        favourite: boolean,
    ) {  }
}






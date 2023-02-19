
export interface Quiz {
    name: string; 
    description: string; 
    questionList : Question[];
}

export interface Question {
    answered: unknown;
    questionContent: string;
    answerList: Answer[];
}

export interface Answer {
    answerContent: string; 
    content: string;
    correct: boolean;
}


// --------------------------------


export interface resultQuiz {
    name: string; 
    description: string; 
    questionList : resultQuestion[];
}

export interface resultQuestion {
    questionContent: string;
    answerList: resultAnswer[];
}

export interface resultAnswer {
    answerContent: string; 
    
    correct: boolean;
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

export class allUserQuizes {
    name: string;
    id: number;
    description: string;
    creatorName: string;
    date : Date;
    resultQuizIds: any[];
    constructor(
        name: string,
        id : number,
        description: string,
        date: Date,
        creatorName: string,
    ) {  }
}
export class quizUsers {
    username: string;
    id: number;
    date: Date;

    constructor(
        username: string,
        date : Date,
    ) {  }
}
export class inputAnswer {
    answerContent: string;
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






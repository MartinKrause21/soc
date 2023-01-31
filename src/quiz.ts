
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
    content: string; 
    correct: boolean;
}


export class allTeacherQuizes {
    name: string;
    description: string;
    resultQuizIds: any[];

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
    content: string;

    constructor(
        content: string,
    ) {  }
}





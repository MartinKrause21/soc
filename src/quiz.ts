
export interface Quiz {
    name: string; 
    description: string; 
    questionList : Question[];
}

export interface Question {
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

    constructor(
        name: string,
        id : number,
        description: string,
        creatorName: string,
    ) {  }
}
export class quizUsers {
    username: string;
    id: number;

    constructor(
        username: string,
    ) {  }
}




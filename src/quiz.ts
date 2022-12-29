
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

export class allTeacherQuizes {
    name: string;
    description: string;

    constructor(
        name: string,
        description: string,
    ) {  }
}
export class quizUsers {
    username: string;

    constructor(
        username: string,
    ) {  }
}


export interface Quiz {
    name: string; 
    questionList : Question[];
    //favourite: boolean;
    description: string;
}

export interface Question {
    answerList: Answer[];
    questionContent: string;
}

export interface Answer {
    content: string; 
    correct: boolean;
    //difficulty: number;
}

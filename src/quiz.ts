
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
    answerContent: string; 
    correct: boolean;
}

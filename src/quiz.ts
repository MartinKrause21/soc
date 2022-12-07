
export interface Quiz {
    title: string; 
    questionList : Question[];
    favourite: boolean;
    description: string;
}

export interface Question {
    answerList: Answer[];
    content: string;
}

export interface Answer {
    content: string; 
    correct: boolean;
    difficulty: number;
}

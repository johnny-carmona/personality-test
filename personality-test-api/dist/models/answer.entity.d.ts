import { Question } from './question.entity';
export declare class Answer {
    id: number;
    questionId: number;
    userId: string;
    value: number;
    question: Question;
}

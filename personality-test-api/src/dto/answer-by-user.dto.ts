import { Question } from "src/models/question.entity";

export class AnswerByUserDto {
    questionId: number;
    userId: string;
    value: number;
    question: Question
}
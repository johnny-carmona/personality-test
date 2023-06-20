import { Repository } from 'typeorm';
import { Question } from '../models/question.entity';
export declare class QuestionsService {
    private readonly questionRepository;
    constructor(questionRepository: Repository<Question>);
    findAll(): Promise<Question[]>;
}

import { Repository } from 'typeorm';
import { Answer } from '../models/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';
export declare class AnswersService {
    private readonly answerRepository;
    constructor(answerRepository: Repository<Answer>);
    findAllByUserEmail(email: string): Promise<Answer[]>;
    create(createAnswerDto: CreateAnswerDto): Promise<Answer>;
}

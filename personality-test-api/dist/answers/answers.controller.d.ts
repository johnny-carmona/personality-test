import { AnswersService } from './answers.service';
import { AnswerPayloadDto } from '../dto/answer-payload.dto';
export declare class AnswersController {
    private readonly answersService;
    constructor(answersService: AnswersService);
    findAllByUserEmail(email: string): Promise<{}>;
    create(answerPayloadDto: AnswerPayloadDto): Promise<{
        statusCode: number;
        message: string;
    }>;
}

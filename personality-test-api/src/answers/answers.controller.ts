import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswerPayloadDto } from '../dto/answer-payload.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    @Get(':email')
    async findAllByUserEmail(@Param('email') email: string) {
        const answers = await this.answersService.findAllByUserEmail(email);
        const results = {};
        answers.forEach(answer => {
            results[answer.question.dimension] = results[answer.question.dimension] ?
                results[answer.question.dimension] + answer.value * answer.question.direction :
                answer.value * answer.question.direction;
        });
        return results;
    }

    @Post()
    async create(@Body() answerPayloadDto: AnswerPayloadDto) {
        Object.keys(answerPayloadDto.answers).forEach(async key => {
            const answer = await this.answersService.create({
                questionId: parseInt(key),
                userId: answerPayloadDto.email,
                value: answerPayloadDto.answers[key]
            });
        });
        return { statusCode: 200, message: 'Answers created successfully' };
    }
}

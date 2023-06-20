import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @ApiOperation({ summary: 'Get all questions' })
    @Get()
    async findAll() {
        const questions = await this.questionsService.findAll();
        return questions;
    }
}

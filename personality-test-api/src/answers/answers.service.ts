import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../models/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { AnswerByUserDto } from 'src/dto/answer-by-user.dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) { }

    findAllByUserEmail(email: string): Promise<AnswerByUserDto[]> {
        return this.answerRepository
            .createQueryBuilder('answer')
            .leftJoinAndSelect('answer.question', 'question')
            .where('answer.userId = :email', { email })
            .getMany();
    }

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        const { userId, questionId } = createAnswerDto;
        let answer = await this.answerRepository.findOne({ where: { userId, questionId } });
        if (answer) {
            answer.value = createAnswerDto.value;
        } else {
            answer = this.answerRepository.create(createAnswerDto);
        }
        return this.answerRepository.save(answer);
    }
}

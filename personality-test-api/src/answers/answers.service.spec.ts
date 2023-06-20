import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../models/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Question } from 'src/models/question.entity';

describe('AnswersService', () => {
  let service: AnswersService;
  let answerRepository: Repository<Answer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
    answerRepository = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  describe('findAllByUserEmail', () => {
    it('should return answers for a given email', async () => {
      // Mock data
      const email = 'test@example.com';
      const mockAnswers = [{ id: 1, value: 'Answer 1' }, { id: 2, value: 'Answer 2' }];

      // Mock the answerRepository's find method
      answerRepository.createQueryBuilder = jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockAnswers),
      });

      // Call the service method
      const result = await service.findAllByUserEmail(email);

      // Assertions
      expect(result).toEqual(mockAnswers);
      expect(answerRepository.createQueryBuilder).toHaveBeenCalledWith('answer');
      expect(answerRepository.createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'answer.question',
        'question',
      );
      expect(answerRepository.createQueryBuilder().where).toHaveBeenCalledWith('answer.userId = :email', { email });
      expect(answerRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new answer', async () => {
      // Mock data
      const createAnswerDto: CreateAnswerDto = {
        userId: 'user1',
        questionId: 1,
        value: 1,
      };
      const mockAnswer: Answer = {
        id: 1, ...createAnswerDto,
        question: new Question
      };

      // Mock the answerRepository's findOne and create methods
      answerRepository.findOne = jest.fn().mockResolvedValue(null);
      answerRepository.create = jest.fn().mockReturnValue(mockAnswer);
      answerRepository.save = jest.fn().mockResolvedValue(mockAnswer);

      // Call the service method
      const result = await service.create(createAnswerDto);

      // Assertions
      expect(result).toEqual(mockAnswer);
      expect(answerRepository.findOne).toHaveBeenCalledWith({ where: { userId: createAnswerDto.userId, questionId: createAnswerDto.questionId } });
      expect(answerRepository.create).toHaveBeenCalledWith(createAnswerDto);
      expect(answerRepository.save).toHaveBeenCalledWith(mockAnswer);
    });

    it('should update an existing answer', async () => {
      // Mock data
      const createAnswerDto: CreateAnswerDto = {
        userId: 'user1',
        questionId: 1,
        value: 1,
      };
      const existingAnswer: Answer = {
        id: 1, ...createAnswerDto,
        question: new Question
      };
      const updatedAnswer: Answer = { ...existingAnswer, value: createAnswerDto.value };

      // Mock the answerRepository's findOne and save methods
      answerRepository.findOne = jest.fn().mockResolvedValue(existingAnswer);
      answerRepository.save = jest.fn().mockResolvedValue(updatedAnswer);

      // Call the service method
      const result = await service.create(createAnswerDto);

      // Assertions
      expect(result).toEqual(updatedAnswer);
      expect(answerRepository.findOne).toHaveBeenCalledWith({ where: { userId: createAnswerDto.userId, questionId: createAnswerDto.questionId } });
      expect(answerRepository.save).toHaveBeenCalledWith(updatedAnswer);
    });
  });
});

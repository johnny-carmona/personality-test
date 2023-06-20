import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../models/question.entity';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionRepository: Repository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    questionRepository = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  describe('findAll', () => {
    it('should return all questions', async () => {
      // Mock data
      const mockQuestions = [{ id: 1, text: 'Question 1' }, { id: 2, text: 'Question 2' }];

      // Mock the questionRepository's find method
      questionRepository.find = jest.fn().mockResolvedValue(mockQuestions);

      // Call the service method
      const result = await service.findAll();

      // Assertions
      expect(result).toEqual(mockQuestions);
      expect(questionRepository.find).toHaveBeenCalled();
    });
  });
});

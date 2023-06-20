import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from '../models/question.entity';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  describe('findAll', () => {
    it('should return all questions', async () => {
      // Mock data
      const mockQuestions: Question[] = [
        { id: 1, question: 'Question 1', dimension: 'dimension 1', direction: 1, meaning: 'meaning 1' },
        { id: 2, question: 'Question 2', dimension: 'dimension 2', direction: -1, meaning: 'meaning 2' }
      ];

      // Mock the questionsService's findAll method
      jest.spyOn(service, 'findAll').mockResolvedValue(mockQuestions);

      // Call the controller method
      const result = await controller.findAll();

      // Assertions
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockQuestions);
    });
  });
});

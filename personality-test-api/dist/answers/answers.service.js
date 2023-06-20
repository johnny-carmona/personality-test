"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("../models/answer.entity");
let AnswersService = exports.AnswersService = class AnswersService {
    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }
    findAllByUserEmail(email) {
        return this.answerRepository
            .createQueryBuilder('answer')
            .leftJoinAndSelect('answer.question', 'question')
            .where('answer.userId = :email', { email })
            .getMany();
    }
    async create(createAnswerDto) {
        const { userId, questionId } = createAnswerDto;
        let answer = await this.answerRepository.findOne({ where: { userId, questionId } });
        if (answer) {
            answer.value = createAnswerDto.value;
        }
        else {
            answer = this.answerRepository.create(createAnswerDto);
        }
        return this.answerRepository.save(answer);
    }
};
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnswersService);
//# sourceMappingURL=answers.service.js.map
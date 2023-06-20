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
exports.AnswersController = void 0;
const common_1 = require("@nestjs/common");
const answers_service_1 = require("./answers.service");
const answer_payload_dto_1 = require("../dto/answer-payload.dto");
let AnswersController = exports.AnswersController = class AnswersController {
    constructor(answersService) {
        this.answersService = answersService;
    }
    async findAllByUserEmail(email) {
        const answers = await this.answersService.findAllByUserEmail(email);
        const results = {};
        answers.forEach(answer => {
            results[answer.question.dimension] = results[answer.question.dimension] ?
                results[answer.question.dimension] + answer.value * answer.question.direction :
                answer.value * answer.question.direction;
        });
        return results;
    }
    async create(answerPayloadDto) {
        Object.keys(answerPayloadDto.answers).forEach(async (key) => {
            const answer = await this.answersService.create({
                questionId: parseInt(key),
                userId: answerPayloadDto.email,
                value: answerPayloadDto.answers[key]
            });
        });
        return { statusCode: 200, message: 'Answers created successfully' };
    }
};
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findAllByUserEmail", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_payload_dto_1.AnswerPayloadDto]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "create", null);
exports.AnswersController = AnswersController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map
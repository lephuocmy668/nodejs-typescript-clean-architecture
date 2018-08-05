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
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const Topic_1 = require("../../../domain/Types/Topic");
let TopicController = class TopicController {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    topic(topic) {
        return this.topicRepository.create(topic);
    }
    one(id) {
        return this.topicRepository.findByID(id);
    }
};
__decorate([
    routing_controllers_1.Post('/topics'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Topic_1.Topic]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "topic", null);
__decorate([
    routing_controllers_1.Get('/topics/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "one", null);
TopicController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [Object])
], TopicController);
exports.TopicController = TopicController;
//# sourceMappingURL=TopicController.js.map
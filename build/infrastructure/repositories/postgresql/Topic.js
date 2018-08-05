"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgreSQLTopicRepository {
    constructor() {
        this.topics = [];
    }
    findByID(id) {
        return new Promise((resolve, reject) => {
            const topic = this.topics.find(tp => {
                return tp.id === id;
            });
            return Promise.resolve(topic || null);
        });
    }
    create(topic) {
        return new Promise((resolve, reject) => {
            const tp = Object.assign({}, topic);
            this.topics.push(tp);
            resolve(tp);
        });
    }
}
exports.default = PostgreSQLTopicRepository;
//# sourceMappingURL=Topic.js.map
import Repository from './Repository.js';

class LogsRepository extends Repository {
    async getModerationLog(page, limit, userId) {
        const query = { page, limit };
        if (userId !== null) {
            query.userId = userId;
        }
        return await this.get('logs/moderation', query);
    }
}

export default new LogsRepository();

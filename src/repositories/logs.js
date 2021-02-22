import Repository from './Repository.js';

class LogsRepository extends Repository {
    async getModerationLog(query) {
        return await this.get('logs/moderation', query);
    }
}

export default new LogsRepository();

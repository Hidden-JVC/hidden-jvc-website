import io from 'socket.io-client';

import { SOCKET_URL } from '../constants';

export default async function getConnectedUsersCount(jwt, forumId, topicId) {
    return new Promise((resolve, reject) => {
        const data = {
            forumId: forumId,
            hidden: true
        };

        if (jwt !== null) {
            data.jwt = jwt;
        }

        if (topicId) {
            data.hidden = true;
            data.topicId = topicId;
        }

        const socket = io.connect(SOCKET_URL, { transports: ['websocket'] });

        socket.on('connect', () => {
            socket.emit('get-users-count', data, (response) => {
                const forumCount = response.forumCount;
                const forumUsers = response.forumUsers;
                const topicCount = response.topicCount;
                const topicUsers = response.topicUsers;
                resolve({ forumCount, forumUsers, topicCount, topicUsers });
            });
        });

        socket.on('connect_error', function (err) {
            reject(err);
        });
    });
}
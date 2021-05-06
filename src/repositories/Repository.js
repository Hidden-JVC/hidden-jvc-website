const API_ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://api.hiddenjvc.com' : 'http://127.0.0.1:8787';

import store from '../store';

export default class Repository {
    async get(path, query = {}) {
        const queryString = (new URLSearchParams(query)).toString();
        let url = `${API_ROOT_URL}/${path}`;
        if (queryString.length > 0) {
            url = `${url}?${queryString}`;
        }
        const response = await fetch(url);
        return await response.json();
    }

    async post(path, body) {
        const url = `${API_ROOT_URL}/${path}`;

        const headers = {
            'Content-Type': 'application/json'
        };

        if (store.state.user.jwt !== null) {
            headers.authorization = `Bearer ${store.state.user.jwt}`;
        }

        const request = new Request(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const response = await fetch(request);
        return response.json();
    }
}

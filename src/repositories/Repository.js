const API_ROOT_URL = 'http://127.0.0.1:8787';


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
        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await fetch(request);
        return response.json();
    }
}

import config from 'config';
import { authHeader } from '../_helpers';

export const articleService = {
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}articles/getAll`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}articles/${id}`, requestOptions).then(handleResponse);
}

function register(article) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };

    return fetch(`${config.apiUrl}articles/register`, requestOptions).then(handleResponse);
}

function update(newArticle) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
    };

    return fetch(`${config.apiUrl}articles/update`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}articles/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        if (text === "Unauthorized") {
            return Promise.reject(text);
        }
        const data = text && JSON.parse(text);
        if (!response.ok || data.error) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data.error) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
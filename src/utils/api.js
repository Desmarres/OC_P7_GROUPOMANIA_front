/**
 * Erreurs renvoyées par l'Api
 */
export class ApiErrors {
    constructor(errors) {
        this.errors = errors;
    }
}

/**
 * 
 * @param {string} endpoint 
 * @param {string} token 
 * @param {object} options 
 */

export async function apiFetch(endpoint, options = {}, contenttype = 'application/json') {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': contenttype
    });
    if (localStorage.tokens) {
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('tokens')));
    }

    const response = await fetch("http://localhost:4200/api" + endpoint, {
        headers,
        ...options
    })
    if (response.status === 204) {
        return null;
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData;
    } else {
        const message = responseData.errors ? responseData.errors : [{ msg: responseData.message }];
        throw new ApiErrors(message);
    }
}
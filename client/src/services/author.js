import * as baseService from './base';

function all() {
    return baseService.get('/api/author');
}

function one(id) {
    return baseService.get(`/api/author/${id}`);
}

function insert(data) {
    return baseService.post('/api/author', data);
}

function update(id, data) {
    return baseService.put(`/api/author/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/author/${id}`);
}

export { all, one, insert, update, destroy };
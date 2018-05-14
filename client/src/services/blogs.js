import * as baseService from './base';

function all() {
    return baseService.get('/api/blogs');
}

function one(id) {
    return baseService.get(`/api/blogs/${id}`);
}

function insert(data) {
    return baseService.post('/api/blogs', data);
}

function update(id, data) {
    return baseService.put(`/api/blogs/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogs/${id}`);
}

export { all, one, insert, update, destroy };
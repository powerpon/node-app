export const PORT = 3000;
export const methods = {
    POST: 'POST',
    GET: 'GET',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
}
export const routes = {
    createUser: '/user/create',
    deleteUser: '/user/delete',
    getUserById: '/user',
    getAllUsers: '/users',
    updateUserData: '/user/update',
    addHobbyToUser: '/user/hobbies/add',
    removeHobbyFromUser: '/user/hobbies/remove',
    getHobbiesOfUser: '/user/hobbies',
}
export const HOST = 'http://localhost:';
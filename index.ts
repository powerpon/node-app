const http = require('http');
const url = require('url');
import {HOST, PORT, methods, routes} from './constants';
import { data } from './data';
import { isHobbyDTO, isUpdateUserDTO, isUserModel } from './typeChecks';

let userIdGenerator = 1;

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);

    if(request.method === methods.POST && parsedUrl.pathname === routes.createUser){
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(body);
            parsedData.id = userIdGenerator++;
            if(!isUserModel(parsedData)){
                response.statusCode = 400;
                response.end('Bad Request');
                return;
            }
            data.users.push(parsedData);
            response.statusCode = 201;
            response.end(JSON.stringify(parsedData));
        });
    }
    else if (request.method === methods.DELETE && parsedUrl.pathname === routes.deleteUser && parsedUrl.query.id){
        data.users = data.users.filter((user) => user.id != parsedUrl.query.id);
        response.end();
    }
    else if (request.method === methods.GET && parsedUrl.pathname === routes.getAllUsers){
        response.end(JSON.stringify(data.users.map((user) => {return {name: user.name, email: user.email, id: user.id, links: {self: {href: HOST + PORT + routes.getUserById + '?id=' + user.id}, hobbies: {href: HOST + PORT + routes.getHobbiesOfUser + '?id=' + user.id}}}})));
    }
    else if (request.method === methods.GET && parsedUrl.pathname === routes.getUserById && parsedUrl.query.id){
        const foundUser = data.users.find((user) => user.id == parsedUrl.query.id);
        if(!foundUser){
            response.statusCode = 404;
            response.end('User With Id "' + parsedUrl.query.id + '" Not Found');
            return;
        }
        response.end(JSON.stringify({name: foundUser.name, email: foundUser.email, id: foundUser.id, links: {self: {href: HOST + PORT + routes.getUserById + '?id=' + foundUser.id}, hobbies: {href: HOST + PORT + routes.getHobbiesOfUser + '?id=' + foundUser.id}}}));
    }
    else if (request.method === methods.PATCH && parsedUrl.pathname === routes.updateUserData && parsedUrl.query.id){
        const foundUser = data.users.find((user) => user.id == parsedUrl.query.id);
        if(!foundUser){
            response.statusCode = 404;
            response.end('User With Id "' + parsedUrl.query.id + '" Not Found');
            return;
        }
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(body);
            if(!isUpdateUserDTO(parsedData)){
                response.statusCode = 400;
                response.end('Bad Request');
                return;
            }
            for(let property of Object.keys(parsedData)){
                if(foundUser[property]){
                    foundUser[property] = parsedData[property];
                }
            }
            response.end(JSON.stringify(foundUser));
        });
    }
    else if (request.method === methods.PATCH && parsedUrl.pathname === routes.addHobbyToUser && parsedUrl.query.id){
        const foundUser = data.users.find((user) => user.id == parsedUrl.query.id);
        if(!foundUser){
            response.statusCode = 404;
            response.end('User With Id "' + parsedUrl.query.id + '" Not Found');
            return;
        }
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(body);
            if(!isHobbyDTO(parsedData)){
                response.statusCode = 400;
                response.end('Bad Request');
                return;
            }
            if(!foundUser.hobbies.includes(parsedData.hobby)){
                foundUser.hobbies.push(parsedData.hobby);
            }
            response.end(JSON.stringify(foundUser));
        });
    }
    else if (request.method === methods.PATCH && parsedUrl.pathname === routes.removeHobbyFromUser && parsedUrl.query.id){
        const foundUser = data.users.find((user) => user.id == parsedUrl.query.id);
        if(!foundUser){
            response.statusCode = 404;
            response.end('User With Id "' + parsedUrl.query.id + '" Not Found');
            return;
        }
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(body);
            if(!isHobbyDTO(parsedData)){
                response.statusCode = 400;
                response.end('Bad Request');
                return;
            }
            if(foundUser.hobbies.includes(parsedData.hobby)){
                foundUser.hobbies = foundUser.hobbies.filter((hobby) => hobby !== parsedData.hobby);
            }
            response.end(JSON.stringify(foundUser));
        });
    }
    else if (request.method === methods.GET && parsedUrl.pathname === routes.getHobbiesOfUser && parsedUrl.query.id){
        const foundUser = data.users.find((user) => user.id == parsedUrl.query.id);
        if(!foundUser){
            response.statusCode = 404;
            response.end('User With Id "' + parsedUrl.query.id + '" Not Found');
            return;
        }
        response.setHeader('Cache-Control', 'public', 'max-age=3600');
        response.end(JSON.stringify(foundUser.hobbies));
    }
    else {
        response.statusCode = 404;
        response.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
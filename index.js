const express = require('express');

const server = express();
server.use(express.json());

const users = ['Joao', 'Vitor'];

server.use((request, response, next)=>{
    console.time('request')
    console.log(`Metodo: ${request.method}, URL: ${request.url};`);

    next();

    console.timeEnd('request');
});

server.get('/users/:index',(request, response)=>{
    const {index} = request.params;

    return response.json({messagem:`Buscando usuario ${users[index]}`});
});

server.get('/users',(request, response)=>{
    return response.json(users);
});


server.post('/users',(request, response)=>{
    
    const {nome} = request.body;
    users.push(nome);

    return response.json(users);
});

server.put('/users/:index',(request, response)=>{
    
    const {nome} = request.body;
    const {index} = request.params;

    users[index]=nome;

    return response.json(users);
});

server.delete('/users/:index',(request, response)=>{
    
    const {index} = request.params;

    users.splice(index,1);

    return response.send();
});


server.listen(3000);
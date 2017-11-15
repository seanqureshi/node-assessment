const express = require('express'),
    bodyParser = require('body-parser'),
    // session = require('express-session'),
    port = 3000;

//Controller
const usersCtrl = require('./usersCtrl');

const app = express ();

app.use( bodyParser.json() );

app.get('/api/users', usersCtrl.allUsers);
app.get('/api/users/:id', usersCtrl.getUserByID);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:type', usersCtrl.getUsersByType);

app.put('/api/users/:id', usersCtrl.updateUserById);
app.post('/api/users', usersCtrl.addUser);
app.delete('/api/users/:id', usersCtrl.deleteUser);

app.listen(port, ()=> console.log(`Listening on port ${port}`));



var userData = require('./userData.json');

let finalData;
let id = userData.length+1;

module.exports = {
    // getClothes: function(req, res){
    //     let response,
    //         status=200
    //     db.getRedClothes().then((data, err)=>{
    //         return err ? status=500 : null //do some with data, set to response
    //     })
    //     res.status(status).send(response)
    // },
    allUsers: (req, res) => {
        if(req.query.age) {
             finalData = userData.filter(user => {
                if(req.query.age > +user.age) {
                    return user
                } 
            })
             res.status(200).send(finalData)
        }
        if(req.query.lastname) {
        finalData = userData.filter(user => {
                if(req.query.lastname === user.last_name) {
                    return user;
                }
            })
            res.status(200).send(finalData)
        }
        if(req.query.email) {
        finalData = userData.filter(user => {
                if(req.query.email === user.email) {
                    return user
                } 
            })
            res.status(200).send(finalData)
        }
        if(req.query.favorites) {
        finalData = userData.filter(user => {
            for(var i = 0; i < user.favorites.length; i++) {
                if(req.query.favorites === user.favorites[i] ){
                    return user
                }
            } 
            })
            res.status(200).send(finalData)
        }
        res.status(200).send(userData)  
    }, 
    getUserByID: (req, res) => {
        let userById = userData.find(user => {
            if(user.id === +req.params.id) {
                return user;
            }
        });
        if(userById) {
            res.status(200).send(userById)
        } else {
            res.status(404).json(null)
        }
    }, 
    getAdmins: (req, res) => {
        let admin = userData.filter(user => {
            if(user.type.toLowerCase() === 'admin') {
                return user
            }
        })
        res.status(200).send(admin)
    },
    getNonAdmins: (req, res) => {
        let nonAdmin = userData.filter(user => {
            if(user.type.toLowerCase() !== 'admin') {
                return user
            }
        })
        res.status(200).send(nonAdmin)
    },
    getUsersByType: (req, res) => {
        let usersByType = userData.filter(user => {
            if(user.type.toLowerCase() === req.params.type) {
                return user
            }
        })
        res.status(200).send(usersByType);
    },
    updateUserById: (req, res) => {
        userData.forEach(user => {
            if(user.id === +req.params.id) {
                user.type = req.body.type;
                user.first_name = req.body.first_name;
                user.last_name = req.body.last_name;
            }
        })
        res.status(200).send(userData)
    },
    addUser: (req, res) => {
        let newUser = Object.assign({}, {id}, req.body)
        userData.push(newUser)
        id++;
        res.status(200).send(userData);
    },
    deleteUser: (req, res) => {
        let deletedUser = userData.filter(user => {
            if(user.id !== + req.params.id) {
                return user;
            }
        })
        res.status(200).send(deletedUser)
    }

}

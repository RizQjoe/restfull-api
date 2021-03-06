const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: (req, res) => {
    User.find((err, dataUser) =>{
      if(err){
        res.send(err)
      }else {
        res.send(dataUser)
      }
    })
  },
  createUser: (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    let userData = new User({
      username: req.body.username,
      password: hash,
      role: req.body.role
    })
    userData.save((err, resultUser) => {
      if(err){
        res.send(err)
      }else {
        res.send(resultUser)
      }
    })
  },
  findByIdUser: (req, res) => {
    User.findById(req.params.id, (err, dataUser) => {
      if(err){
        res.send(err)
      }else {
        res.send(dataUser)
      }
    })
  },
  updateUser: (req, res) => {
    User.update({_id: req.params.id}, {
      $set: req.body
    }, (err, resultUser) => {
      if(err){
        res.send(err)
      }else {
        res.send(resultUser)
      }
    })
  },
  removeUser: (req, res) => {
    User.remove({ _id:req.params.id}, (err, resultUser) => {
      if (err) {
        res.send(err)
      }else {
        res.send({
          msg: 'data berhasil di hapus',
          resultUser: resultUser
        })
      }
    })
  }

}

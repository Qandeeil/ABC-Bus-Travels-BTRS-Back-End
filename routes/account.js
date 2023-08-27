var express = require('express');
var router = express.Router();
const account = require('../Schemas/Account.Schema')
const multer = require('multer')

router.get('/', async (req, res, next) => {
  const getUsers = await account.find();
  res.send(getUsers)
});

router.post('/createAccount', async (req,res,next) => {
  const {
    name, 
    username, 
    email, 
    password,
    phoneNumber,
    address,
    country,
    profilePhoto,
    bio,
    caseC
  } = req.body

  const checkUsername = await account.findOne({
    username
  })

  const checkEmail = await account.findOne({
    email
  })

  if(checkUsername) {
    res.send({checkUsername: true, message: 'Username already exists'})
  }else if(checkEmail) {
    res.send({checkEmail: true, message: 'Email already exists'})
  }else {
    const addAccount = await account.create({
      name, 
      username, 
      email, 
      password,
      phoneNumber,
      address,
      country,
      profilePhoto,
      bio,
      case: caseC
    })
    res.send({createAccount: true, message: "The account has been created", adminId: addAccount._id, DataAccount: {_id: addAccount._id, case: addAccount.case}})
  }
})

router.put('/updateAccount', async (req,res,next) => {
  const {_id, phoneNumber, country, address} = req.body;

  const updateAccount = await account.findByIdAndUpdate(_id, {
    phoneNumber,
    country,
    address
  })
  res.send({update: true, meesage: "Successful update", DataAccount: {_id: updateAccount._id, case: updateAccount.case}})
})


const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './ProfilePicture')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().getSeconds() + file.originalname)
  }
})

const uploads = multer({
  storage
}).single('profilePicture')

router.put('/updateProfilePicture', uploads, async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const { _id } = req.body;
  const filename = req.file.filename;
  const profilePicture = url + '/Profile-Picture/' + filename;
  try {
    await account.findByIdAndUpdate(_id, { profilePicture });
    res.send({ update: true, message: 'Successful update' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to update profile picture' });
  }
});

router.post('/login', async (req,res,next) => {
  const {username, email, password} = req.body
  
  const checkEmailOrUsername = await account.findOne({
    username
  })

  if(checkEmailOrUsername) {
    const checkusername = await account.findOne({
      username
    })
    if(checkusername) {
      const checkAccount = await account.findOne({
        username,
        password
      })
      if(checkAccount) {
        res.send({isLogin: true, userId: checkusername._id, isLoginEmail: true, isLoginPassword: true, DataAccount: {_id: checkAccount._id, case: checkAccount.case}})
      }else {
        res.send({isLoginPassword: false, message: 'Please check your password', isLoginEmail: true})
      }
    }else {
      res.send({isLogin: false, message: 'Please check your username', isLoginPassword: true})
    }
    
  } else if(email) {
    const checkEmail = await account.findOne({
      email
    })
    if(checkEmail) {
      const checkAccount = await account.findOne({
        email,
        password
      })
      if(checkAccount) {
        res.send({isLogin: true, userId: checkEmail._id, isLoginEmail: true, isLoginPassword: true, DataAccount: {_id: checkAccount._id, case: checkAccount.case}})
      }else {
        res.send({isLoginPassword: false, message: 'Please check your password', isLoginEmail: true})
      }
    }else {
      res.send({isLoginEmail: false, message: 'Please check your email', isLoginPassword: true})
    }
  }
})


module.exports = router;

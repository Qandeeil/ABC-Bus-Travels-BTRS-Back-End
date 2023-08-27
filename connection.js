const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Qandeeil:917Bn1wMovY7KESf@cluster0.wqfwxbi.mongodb.net/BTRS-Trips';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

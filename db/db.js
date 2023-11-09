const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mess_queue')
  .then((response) => console.log('Db is connected'))
  .catch((err) => console.log('Error: ', err))
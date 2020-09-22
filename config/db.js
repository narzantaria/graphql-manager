const mongoose = require('mongoose');
const config = require('config');

module.exports = connectDB = () => {
  mongoose.connect(
    `mongodb+srv://${config.get('MONGO_USER')}:${config.get('MONGO_PASSWORD')}@cluster0-vuauc.mongodb.net/${config.get('MONGO_DB')}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  ).then(() => {
    console.log('Connection to database established...');
  }).catch(err => {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  });
}
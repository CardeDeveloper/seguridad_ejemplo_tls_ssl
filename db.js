
//Import the mongoose module
var mongoose = require('mongoose');
//fix warning  DeprecationWarning: current URL string parser is deprecated
mongoose.set('useNewUrlParser', true);
//fix warning collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
//mongoose.set('debug', true);

mongoose.set('useUnifiedTopology', true);

mongoose.set('useFindAndModify', true)
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/Seguridad_tls'

mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
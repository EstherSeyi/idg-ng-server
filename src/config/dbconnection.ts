import mongoose from 'mongoose';

async function dbConnection() {
  await mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(mongoDBConnected);

  mongoose.connection.on('disconnected', mongoDBDisconnected);
  mongoose.connection.on('error', mongoDBError);
}

function mongoDBConnected() {
  console.log('connected to MongoDB');
}

function mongoDBDisconnected() {
  console.log('MongoDB disconnected');
}

function mongoDBError(err: Error) {
  console.error('MongoDB Error', err);
  process.exit(1);
}

export default dbConnection;

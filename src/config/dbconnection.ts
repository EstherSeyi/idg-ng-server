import mongoose from 'mongoose';
// import { seedUsers, seedCamps, seedCandidates, seedFamilies } from './seed';

async function dbConnection() {
  await mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(mongoDBConnected);

  // await disconnectDB();
  // await seedUsers();
  // await seedCamps();
  // await seedCandidates();
  // await seedFamilies();
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

// async function disconnectDB() {
//   await mongoose.connection.db.dropDatabase();
//   console.log('DB dropped');
// }

export default dbConnection;

import Mongoose from 'mongoose';

const mongo = Mongoose.connect(
  'mongodb://stef:s@ds119059.mlab.com:19059/budgetmanagerangular',
  {
    useMongoClient: true
  }
);

export default mongo;

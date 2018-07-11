import Mongoose from 'mongoose';

const mongo = Mongoose.connect(
  'mongodb://budgetmanager1:Budgetmanager1@ds247290.mlab.com:47290/budgetmanagerangular',
  {
    // useMongoClient: true
  }
).catch(error => {console.log(error); throw new Error(erro)});

export default mongo;

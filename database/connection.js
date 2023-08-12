const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to the database`);
  })
  .catch((reason) => {
    console.log(`An error occurred while trying to connect to database: ${reason}`);
  });

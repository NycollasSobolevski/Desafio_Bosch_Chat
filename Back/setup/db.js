const mongoose = require('mongoose');

module.exports = function () {
    const db = process.env.DATABASE_ADDRESS;
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`connected to ${db}`));
}
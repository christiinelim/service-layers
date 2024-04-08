// data piping > put data into databse using schema.sql
// data seeding > put in the data

const express = require('express');
const app = express();
const customerRoutes = require("./controller-layer/customer");

app.use(express.json());

// we are calling a method called config in dotenv
require('dotenv').config();


async function main() {
    app.use("/customers", customerRoutes);
}

main();

app.listen(3000, () => {
    console.log("server has started")
})

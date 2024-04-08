// by right not suppose to call like this but to call via model
// DAL access data via model
const { createConnection } = require('mysql2/promise');

// this is the route which must be in the route layer not DAL
// app.get('/customers', async (req, res) => {
//     let [customers] = await connection.execute("SELECT * from Customers JOIN Companies ON Customers.company_id = Companies.company_id")
// })

let connection;

async function main() {
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    });
}


const retrieveAllCustomers = async () => {
    try {
        await main();
        let [customers] = await connection.execute("SELECT * from Customers JOIN Companies ON Customers.company_id = Companies.company_id");
        return customers;
    } catch (error) {
        console.error("Error retrieving all customers", error)
    }
}

const createCustomer = async (first_name, last_name, rating, company_id) => {
    try {
        await main();
        let query = 'INSERT INTO Customers (first_name, last_name, rating, company_id) VALUES (?, ?, ?, ?)';
        let bindings = [first_name, last_name, rating, company_id];
        await connection.execute(query, bindings);
    } catch (error) {
        console.error("Error creating customer", error)
    }
} 

const updateCustomer = async (customer_id, first_name="", last_name="", rating=0, company_id=0) => {
    await main();

    try {
        let queryString = `UPDATE Customers SET `

        if (first_name) {
            queryString += ` first_name = '${first_name}',` 
        }
        if (last_name) {
            queryString += ` last_name = '${last_name}',` 
        } 
        if (rating) {
            queryString += ` rating = ${rating},` 
        }
        if (company_id) {
            queryString += ` company_id = ${company_id},` 
        }

        let processedQueryString = queryString.slice(0, queryString.length-1);
        processedQueryString += ` WHERE customer_id = ${customer_id}`;
        await connection.execute(processedQueryString);
    } catch (error) {
        console.error("error", error)
    }
    

}

module.exports = {
    retrieveAllCustomers,
    createCustomer,
    updateCustomer
}
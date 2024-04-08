// change name of what is imported ":"
const { retrieveAllCustomers, createCustomer: newCustomer, updateCustomer: updateCustomerDAL } = require('../data-access-layer/customer');

const getAllCustomers = async () => {
    const customers = await retrieveAllCustomers();
    return customers;
}

const createNewCustomer = async (first_name, last_name, rating, company_id) => {
    await newCustomer(first_name, last_name, rating, company_id);
}

const updateCustomer = async (customer_id, first_name, last_name, rating, company_id) => {
    await updateCustomerDAL(customer_id, first_name, last_name, rating, company_id);
}

module.exports = {
    getAllCustomers,
    createNewCustomer,
    updateCustomer
}
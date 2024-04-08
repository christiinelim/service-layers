const express = require('express');
const router = express.Router();

const { getAllCustomers, createNewCustomer, updateCustomer } = require("../service-layer/customers");

router.get("/", async (req, res) => {
    const customers = await getAllCustomers();
    
    res.status(200).json({
        "customers": customers
    })
})

router.post("/create", async (req, res) => {
    let {first_name, last_name, rating, company_id} = req.body;
    await createNewCustomer(first_name, last_name, rating, company_id);

    res.status(200).json({
        "message": "success"
    })

    // res.sendStatus(201);
})

router.patch("/update/:customer_id", async (req, res) => {
    let first_name="";
    let last_name="";
    let rating=0;
    let company_id=0;
    let customer_id = req.params.customer_id

    if (req.body.first_name) {
        first_name = req.body.first_name;
    } 
    if (req.body.last_name) {
        last_name = req.body.last_name;
    }
    if (rating) {
        rating = req.body.rating;
    }
    if (company_id) {
        company_id = req.body.company_id;
    }

    await updateCustomer(customer_id, first_name, last_name, rating, company_id);

    res.sendStatus(202);
})

module.exports = router;
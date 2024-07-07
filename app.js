const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the Sales collection
const salesSchema = new mongoose.Schema({
  dateOfSale: Date,
  saleAmount: Number,
  product: String,
  region: String
});

// Create the Sales model
const Sales = mongoose.model('Sales', salesSchema);

// API to initialize the database
app.post('/initialize-db', async (req, res) => {
  const month = req.body.month;
  if (!month || month < 1 || month > 12) {
    return res.status(400).send({ error: 'Invalid month' });
  }

  // Fetch data from third-party API
  const response = await axios.get('https://third-party-api.com/data');
  const data = response.data;

  // Initialize the database with seed data
  await Sales.deleteMany({}); // Clear the collection
  data.forEach((item) => {
    const dateOfSale = new Date(item.dateOfSale);
    dateOfSale.setFullYear(2022); // Set the year to 2022 for demonstration purposes
    const sale = new Sales({
      dateOfSale,
      saleAmount: item.saleAmount,
      product: item.product,
      region: item.region
    });
    sale.save();
  });

  res.send({ message: 'Database initialized successfully' });
});

// API to retrieve sales data for a given month
app.get('/sales/:month', async (req, res) => {
  const month = req.params.month;
  if (!month || month < 1 || month > 12) {
    return res.status(400).send({ error: 'Invalid month' });
  }

  const sales = await Sales.find({ dateOfSale: { $month: month } });
  res.send(sales);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

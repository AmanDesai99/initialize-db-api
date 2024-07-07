Explanation
We define a schema for the Sales collection using Mongoose.
We create an API endpoint /initialize-db that takes a month parameter in the request body.
We fetch data from the third-party API using Axios.
We initialize the database by clearing the Sales collection and then inserting the seed data. We set the year of the dateOfSale field to 2022 for demonstration purposes.
We create another API endpoint /sales/:month that retrieves sales data for a given month. We use the $month operator to match the dateOfSale field against the input month.

To test the API,
you can use a tool like Postman or cURL. Send a POST request to http://localhost:3000/initialize-db with a JSON body containing the month parameter, for example:

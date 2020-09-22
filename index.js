const express = require('express');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
// const path = require('path');
const cors = require('cors');
const config = require('config');

const PORT = config.get('PORT') || 5000;

const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolvers');

const app = express();

// Init Middleware
// Это то же, что body-parser:
app.use(express.json({ extended: false }));

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

// app.use(express.static(path.join(__dirname, 'dist')));

// Connect Database
connectDB();

app.listen(PORT, _ => console.log(`Server started at ${PORT}`));
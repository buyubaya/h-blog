var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch');
// var { getData } = require('./src/firebase/firebaseDB');

// Fake  Data
var productsList = [
    {
        id: 1,
        name: 'Product 01',
        category: 'odd',
        title: 'Hello Product 01'
    },
    {
        id: 2,
        name: 'Product 02',
        category: 'even',
        title: 'Hello Product 02'
    },
    {
        id: 3,
        name: 'Product 03',
        category: 'odd',
        title: 'Hello Product 03'
    },
    {
        id: 4,
        name: 'Product 04',
        category: 'even',
        title: 'Hello Product 04'
    }
];

// getData('moneyCategories').then(data => console.log(data));

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String,
        test: [Product],
        product(id: Int): Product,
        products(category: String): [Product]
    }

    type Product {
        id: Int,
        name: String,
        category: String,
        description: String
    }

    type Mutation {
        updateProduct(id: Int!, name: String!): [Product]
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!',
    test: () => {
        return fetch('http://hieu1801.000webhostapp.com/api/product')
        .then(res => res.json())
        .then(json => json.list);
    },
    product: function(arg){
        var p = productsList.find(item => item.id === arg.id);
        return p;
    },
    products: function(arg){
        var ps = productsList.filter(item => {return item.category === arg.category});
        return ps;
    },
    updateProduct: function(arg){
        productsList.map(item =>{
            if(item.id === arg.id){
                item.name = arg.name
                return item;
            }
        })
        return productsList;
    }
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
var faker = require('faker');

for( i = 0; i< 10; i++){
    console.log( "Product: " + faker.commerce.productName() + " Price: " + faker.commerce.price());
}
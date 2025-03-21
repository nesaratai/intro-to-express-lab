const express = require('express');

const app = express();



// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.


app.get('/greetings/:name', (req, res) => {

  res.send(`<h1>Hello there, ${req.params.name}! What a delight it is to see you once more.</h1>`);
});


// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”







// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

app.get('/roll/:number', (req, res) => {
  const maxNumber = parseInt(req.params.number, 14);

  if (isNaN(maxNumber)) {
    return res.send('<h1>You must specify a number.</h1>');
  }

  const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));
  res.send(`<h1>You rolled a ${rolledNumber}.</h1>`);
});


// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”






// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.

// Data Array:


const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10.00 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
  
    if (collectibles[index]) {
      res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}$, it can be yours!` );
    } else {
      res.status(404).send(`This item is not yet in stock. Check back soon!`);
    }
  });



  // 4. Filter Shoes by Query Parameters
  // Use the following array of shoes in this challenge:

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get("/shoes", (req, res) => {
  let { "min-price": minPrice, "max-price": maxPrice, type } = req.query;

  let filteredShoes = shoes.filter(shoe => {
      return (
        (!minPrice || shoe.price >= Number(minPrice)) &&
          (!maxPrice || shoe.price <= Number(maxPrice)) &&
          (!type || shoe.type === type)
      );
  });

  res.json(filteredShoes);
});




  app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});




  app.listen((3002), ()=>{
    console.log('i am listening on 3002')
});
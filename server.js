const express = require("express");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.get("/greetings/:username", (req, res) => {
  res.send(`It's very nice to see you ${req.params.username}`);
});

app.get("/roll/:number", (req, res) => {
  const input = parseInt(req.params.number);
  if (input !== Number) {
    res.send("You must specify a number");
  } else {
    const roll = Math.floor(Math.random() * input);
    res.send(`You rolled a ${roll}`);
  }
});

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const idx = parseInt(req.params.index);
  if (idx > 2 || idx !== Number) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(
      `So, you want the ${collectibles[idx].name}? for ${collectibles[idx].price}, it can be yours!`
    );
  }
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const minPrice = req.query.minprice;
  const maxPrice = req.query.maxprice;
  const shoeType = req.query.type;
  const searchedShoes = [];
  shoes.forEach((shoe) => {
    if (!minPrice && !maxPrice && !shoeType) {
      searchedShoes.push(shoe)
    }
    if (!minPrice && !maxPrice && shoe.type === shoeType) {
      searchedShoes.push(shoe);
    }
    if (!shoeType) {
      if (!maxPrice && shoe.price >= minPrice) {
        searchedShoes.push(shoe);
      }
      if (!minPrice && shoe.price <= maxPrice) {
        searchedShoes.push(shoe);
      }

      if (shoe.price >= minPrice && shoe.price <= maxPrice) {
        searchedShoes.push(shoe);
      }
    } else if (shoe.type === shoeType) {
      if (!maxPrice && shoe.price >= minPrice) {
        searchedShoes.push(shoe);
      }
      if (!minPrice && shoe.price <= maxPrice) {
        searchedShoes.push(shoe);
      }

      if (shoe.price >= minPrice && shoe.price <= maxPrice) {
        searchedShoes.push(shoe);
      }
    }
  });
  res.send(searchedShoes)
  
});

app.get('*', (req, res) => {
  res.send('<h1>This page does not exist. Please try again.</h1>')
})

app.listen(3000, () => {
  console.log("I am listening");
});

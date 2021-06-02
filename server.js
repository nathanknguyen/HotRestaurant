
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const guests = [
  {
    routeName: 'yodo',
    name: 'Yoda',
    telephone: '11111111',
    id: 90,
    email: 'fakeemail34@notreal.com',
  },
  {
    routeName: 'yoda',
    name: 'Yoda',
    telephone: '11114111',
    id: 245,
    email: 'fakeemai3l@notreal.com',
  },
  {
    routeName: 'yode',
    name: 'Yoda',
    telephone: '11111112',
    id: 227,
    email: 'fakeemail3@notreal.com',
  },
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'make.html')));

app.get('/view', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays all characters
app.get('/api/guests', (req, res) => res.json(guests));

// Displays a single character, or returns false
app.get('/api/guests/:guest', (req, res) => {
  const chosen = req.params.guest;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < guests.length; i++) {
    if (chosen === guests[i].routeName) {
      return res.json(guests[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post('/api/guests', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newGuest = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newGuest.routeName = newGuest.name.replace(/\s+/g, '').toLowerCase();
  console.log(newGuest);

  guest.push(newGuest);
  res.json(newGuest);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

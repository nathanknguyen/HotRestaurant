
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
    email: 'fakeemail@notreal.com',
  },
  {
    routeName: 'yoda',
    name: 'Yoda',
    telephone: '11114111',
    id: 245,
    email: 'fakeemail@notreal.com',
  },
  {
    routeName: 'yode',
    name: 'Yoda',
    telephone: '11111112',
    id: 227,
    email: 'fakeemail@notreal.com',
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
app.get('/api/characters/:character', (req, res) => {
  const chosen = req.params.character;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post('/api/characters', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
  console.log(newCharacter);

  characters.push(newCharacter);
  res.json(newCharacter);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

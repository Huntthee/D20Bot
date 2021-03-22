const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: "Your Username Here",
    password: "Your Pass Here"
  },
  channels: [
    "Channel Name Here"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it

  // If the viewer is rolling the dice.
  if (commandName === '!roll') {
    const num = rollDice();
       if (num === 20){
        client.say(target, `Critical! You rolled ${num}`);
      } else if (num === 1){
        client.say(target, `Oh No! Critical Fail!! you rolled a ${num}`);
      } else {
        client.say(target, `You rolled a ${num}`);
      };
    console.log(`* Executed ${commandName} command`);

  // If we are greeting the viewer
   } else if (commandName === '!greet') {
      client.say(target, `Welcome to my channel! Thanks for stopping by!`)
  // Otherwise we don't know what they want!
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}
// Function called when the "roll" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
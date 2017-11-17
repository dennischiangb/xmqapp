// Enable strict mode, this allows us to use ES6 specific syntax
// such as 'const' and 'let'
'use strict';

// Import the Real Time Messaging (RTM) client
// from the Slack API in node_modules
const RtmClient = require('@slack/client').RtmClient;

// The memory data store is a collection of useful functions we // can
// include in our RtmClient
const MemoryDataStore = require('@slack/client').MemoryDataStore;

// Import the RTM event constants from the Slack API
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Import the client event constants from the Slack API
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const token = 'xoxb-274252984483-jiFvXV9oz1dux6e1RjfJf7O5';

// The Slack constructor takes 2 arguments:
// token - String representation of the Slack token
// opts - Objects with options for our implementation
let slack = new RtmClient(token, {
  // Sets the level of logging we require
  logLevel: 'error', 
  // Initialize a data store for our client, this will 
  // load additional helper functions for the storing 
  // and retrieval of data
  dataStore: new MemoryDataStore(),
  // Boolean indicating whether Slack should automatically 
  // reconnect after an error response
  autoReconnect: true,
  // Boolean indicating whether each message should be marked as // read 
  // or not after it is processed 
  autoMark: true 
});

// Add an event listener for the RTM_CONNECTION_OPENED 
// event, which is called 
// when the bot connects to a channel. The Slack API can 
// subscribe to events by using the 'on' method
slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  // Get the user's name
  let user = slack.dataStore.getUserById(slack.activeUserId);

  // Get the team's name
  let team = slack.dataStore.getTeamById(slack.activeTeamId);

  // Log the slack team name and the bot's name, using ES6's // template
  // string syntax
  console.log(`Connected to ${team.name} as ${user.name}`);
});

// Start the login process
slack.start();

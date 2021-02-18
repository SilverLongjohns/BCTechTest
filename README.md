## BuildCHAT Instant Messenging App

Hello and welcome to BuildCHAT, a web app that facilitates easy communication between members through the use of the Pubnub SDK.

### Installation

First, we will need to clone the git. This can be done through the following command in the terminal whilst in your preferred directory:

`git clone [link]`

Once the files are in the correct location, run `npm install` in order to acquire the dependencies.

Next, we will have to add our publish and subscribe keys from Pubnub: Simply go to Pubnub's developer dashboard, create an account and create your Pubnub app. You will be provided with the keys which you will need to insert into the pubnubScript.js file.

Finally, running node with the command `node .` will allow you to start up the application locally! Simply enter a username and start chatting.

Once in the chatroom, you will be able to send both text and gifs to all other members. Use the chat bar at the bottom of the page to send your messages. You will be able to see who is typing just above it. Use the command !gif in the chat box, followed by a search term(s) or word(s) describing the gif you wish to send. The application will then send an equivalent gif to the chat.

Have fun chatting!

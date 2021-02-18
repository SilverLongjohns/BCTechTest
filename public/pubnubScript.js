    const messagesTop = document.getElementById('messages-top');
    const updateText = document.getElementById('update-text');
    const sendButton = document.getElementById('publish-button');
    const userList = document.getElementById('user-list');
    const giphyAPI = "De62IimMDB4s6Q2bifKlzzaYPHqdsUUf"
    const theChannel = 'general';

    sendButton.addEventListener('click', () => {submitUpdate(username, updateText.value), updateText.value = ""});
    updateText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitUpdate(username, updateText.value), updateText.value = ""
        }
      });

    const pubnub = new PubNub({
      // replace the key placeholders with your own PubNub publish and subscribe keys
      
      uuid: username
    });

    pubnub.addListener({
      message: function(event) {
        clearTimeout(timeoutCache);
        hideTypingIndicator();
        displayMessage(event.message.entry + ': ', event.message.update);
      },
      presence: function(event) {
        
      },
      status: function(event) {
        displayMessage('Connected as: ' + event.publisher,
          "You're now speaking in: " + event.affectedChannels);
      }
    });



    

    pubnub.subscribe({
      channels: ['general'],
      withPresence: true
    });

    submitUpdate = function(anEntry, anUpdate) {
      if (!anUpdate) {
        return
      } else {
      pubnub.publish({
        channel : theChannel,
        message : {'entry' : anEntry, 'update' : anUpdate}
      },
      function(status, response) {
        if (status.error) {
          console.log(status)
        }
      });
    }
  };

    displayMessage = function(messageType, aMessage) {
      let pmessage = document.createElement('p');
      let br = document.createElement('br');
      let line = document.createElement('div');
      let gif = document.createElement('img');
      let messageText = aMessage;
      line.setAttribute("id", "line");

      if (messageText.split(" ")[0] === "!gif") {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPI}&limit=1&rating=g&q=`;
        let str = messageText.split(" ").slice(1).join("%20");
        url = url.concat(str);
        console.log(url);

        fetch(url)
        .then(response => response.json() )
        .then(content => {
          gif.src = content.data[0].images.downsized.url;
          
          console.log(content.data);
          console.log('META', content.meta);
          
          messagesTop.after(pmessage);
          pmessage.appendChild(line);
          pmessage.appendChild(document.createTextNode(messageType));
          pmessage.appendChild(br);
          pmessage.appendChild(gif);
          
          return
        })
        .catch(err => {
          console.error(err)
        })
      } else {
      messagesTop.after(pmessage);
      pmessage.appendChild(line);
      pmessage.appendChild(document.createTextNode(messageType));
      pmessage.appendChild(br);
      pmessage.appendChild(document.createTextNode(messageText));
      }
    }

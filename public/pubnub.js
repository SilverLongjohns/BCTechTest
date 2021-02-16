const messagesTop = document.getElementById('messages-top');
    const updateText = document.getElementById('update-text');
    const sendButton = document.getElementById('publish-button');
    sendButton.addEventListener('click', () => {submitUpdate(theEntry, updateText.value)});

    const theChannel = 'the_guide';
    const theEntry = 'Earth';

    const pubnub = new PubNub({
      // replace the key placeholders with your own PubNub publish and subscribe keys
      publishKey: 'replaceme',
      subscribeKey: 'replaceme',
      uuid: "theClientUUID"
    });

    pubnub.addListener({
      message: function(event) {
        displayMessage('[MESSAGE: received]',
          event.message.entry + ': ' + event.message.update);
      },
      presence: function(event) {
        displayMessage('[PRESENCE: ' + event.action + ']',
          'uuid: ' + event.uuid + ', channel: ' + event.channel);
      },
      status: function(event) {
        displayMessage('[STATUS: ' + event.category + ']',
          'connected to channels: ' + event.affectedChannels);

        if (event.category == 'PNConnectedCategory') {
          submitUpdate(theEntry, 'Harmless.');
        }
      }
    });

    pubnub.subscribe({
      channels: ['the_guide'],
      withPresence: true
    });

    submitUpdate = function(anEntry, anUpdate) {
      pubnub.publish({
        channel : theChannel,
        message : {'entry' : anEntry, 'update' : anUpdate}
      },
      function(status, response) {
        if (status.error) {
          console.log(status)
        }
        else {
          displayMessage('[PUBLISH: sent]',
            'timetoken: ' + response.timetoken);
        }
      });
    };

    displayMessage = function(messageType, aMessage) {
      let pmessage = document.createElement('p');
      let br = document.createElement('br');

      messagesTop.after(pmessage);
      pmessage.appendChild(document.createTextNode(messageType));
      pmessage.appendChild(br);
      pmessage.appendChild(document.createTextNode(aMessage));
    }
let typingIndicator = document.getElementById("typing-indicator");
let typingUserId = document.getElementById("typing-user-id");
let timeoutCache = 0;
let isTyping = false;

updateText.addEventListener('keypress', (e) => {
  const updateHasText = updateText.value.length > 0;

  if ((updateHasText && !isTyping) || (!updateHasText && isTyping)) {
    isTyping = !isTyping;
    pubnub.signal({
    channel: 'general',
    message: updateHasText ? '1' : '0'
    });
  }
})

function hideTypingIndicator() {
  isTyping = false;
  typingIndicator.style = "visibility:hidden;"
  typingUserId.innerHTML = ""
}

pubnub.addListener({
  message: function(event) {
    clearTimeout(timeoutCache);
    hideTypingIndicator();
  },
  signal: function(s) { 
    clearTimeout(timeoutCache);
    typingIndicator.style = "";
    typingUserId.innerHTML = s.publisher + " ";
    timeoutCache = setTimeout(hideTypingIndicator, 10000)

    if (s.message === '0') {
      hideTypingIndicator();
    }
  }
});


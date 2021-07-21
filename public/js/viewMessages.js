const getMessages = () => {
    const messagesRef = firebase.database().ref("/messages");
    messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
     checkPasscode(data);
    });
}


let numWrong = 0;
let found = false;


// Hide the passcode view
function checkPasscode(messages) {
const viewMsgBtn = document.querySelector('#viewMsg');
viewMsgBtn.addEventListener("click", () => {
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    const passcodeAttempt = document.querySelector('#passcode').value;
 for (message in messages) {
    const messageData = messages[message];
    if (messageData.passcode == passcodeAttempt) {
        // Show the message
        const messageDiv = document.querySelector('#message');
        messageDiv.innerHTML = messageData.message;  
        found = true; 
    }
}

if (!found) {
    console.log("incorrect passcode");
    numWrong++;
    passcodeInput.style.display = "flex";
    if (numWrong === 5) {
        console.log("too many wrong")

    } else if (numWrong >= 3) {
        console.log("getting closer...")
    }
console.log(numWrong);
}

})
}
 

 
// Look through the messages retrived from the database to see if there is anyone one matching the input
 

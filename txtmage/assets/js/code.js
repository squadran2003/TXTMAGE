let chatbox = document.getElementById("chatbox");
let chatBotInputForm = document.getElementById("chatbox-input-form");
let chatBotInput = document.getElementById("chatbox-input");
let chats = document.getElementById("chats");
let userQuestions = document.getElementById("questions");
chatbox.style.height = "70vh";
chatbox.style.width = "100%";
chatbox.style.padding = "2px";
chatbox.style.marginTop = "5px";
chatbox.style.overflowY = "scroll";


userQuestions.style.height = "75vh";
userQuestions.style.width = "100%";
userQuestions.style.padding = "2px";
userQuestions.style.overflowY = "scroll";

progress.style.display = "none";

let chat = [
    {"role": "system", "content": "What can I help you with today?"},
];
const userQuestionsList = [];

function renderUserQuestions() {
    userQuestions.innerHTML = "";
    userQuestions.addClassName = "collections";
    for (let i = 0; i < userQuestionsList.length; i++) {
        let userQuestion = document.createElement("li");
        userQuestion.classList.add("chat-item-border");
        let spanIcon = document.createElement("span");
        spanIcon.classList.add("material-icons");
        spanIcon.textContent = "chat";
        userQuestion.appendChild(spanIcon);
        userQuestion.style.backgroundColor= "#749976";
        userQuestion.style.color = "white";
        userQuestion.style.padding = "5px";
        userQuestion.appendChild(document.createElement("br"));
        let span = document.createElement("span");
        span.classList.add("title");
        span.innerHTML = "You";
        let p = document.createElement("p");
        p.innerHTML = userQuestionsList[i];
        userQuestion.appendChild(span);
        userQuestion.appendChild(p);
        userQuestions.appendChild(userQuestion);
        userQuestions.appendChild(document.createElement("br"));  
    }

    userQuestions.scrollTop = userQuestions.scrollHeight;
}

function displayChat() {
    chats.innerHTML = "";
    for (let i = 0; i < chat.length; i++) {
        let chatItem = document.createElement("li");
        let span = document.createElement("span");
        if(chat[i]["role"]==="You") {
            chatItem.style.backgroundColor = "#918533";
        }else{
            chatItem.style.backgroundColor= "#1f857b";
            
        }
        chatItem.style.color = "white";
        // create a round border on the span tag
        chatItem.classList.add("chat-item-border");
        span.innerHTML = chat[i]["role"];
        let p = document.createElement("p");
        p.innerHTML = chat[i]["content"];
        chatItem.appendChild(span);
        chatItem.appendChild(p);
        chats.appendChild(chatItem);
        //  remove borders from span tag
        chatItem.appendChild(document.createElement("br"));
        chats.appendChild(document.createElement("br"));   
    }
    chatbox.scrollTop = chatbox.scrollHeight;
}

chatBotInputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // get the value of the input field
    let chatBotInputValue = chatBotInput.value;
    chat.push({"role": "You", "content": chatBotInputValue});
    displayChat();
    progress.style.display = "block";
    const response = fetch('/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'message':chatBotInputValue})
    })
    .then(response => response.json())
    .then(data => {
        // push to the front of the list

        userQuestionsList.unshift(chatBotInputValue);
        chat.push({"role": "system", "content": marked.parse(data[0][1])});
        chatBotInput.value = "";
        chatBotInput.focus();
        displayChat();
        renderUserQuestions();
        progress.style.display = "none";
    })
    
}) 

displayChat();
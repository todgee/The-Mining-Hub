const apiKey = "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";

async function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");
    const userMessage = inputField.value;
    if (userMessage.trim() === "") return;

    // Display user's message
    chatBox.innerHTML += `<div class="message user-message">${userMessage}</div>`;
    inputField.value = ""; // Clear input field

    // Send the user's message to ChatGPT and get a response
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant specialized in improving productivity for copper and gold mining operations in South Australia." },
                { role: "user", content: userMessage }
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content.trim();

    // Display ChatGPT's response one character at a time
    typeWriterEffect(botMessage, chatBox);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function typeWriterEffect(text, chatBox) {
    let i = 0;
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "message bot-message";
    chatBox.appendChild(botMessageDiv);

    // Calculate dynamic timeout based on message length
    const baseTimeout = 20; // The base typing speed (in milliseconds)
    const scaleFactor = 100; // You can adjust this to make the speed scaling more/less sensitive
    const dynamicTimeout = Math.max(10, baseTimeout / (text.length / scaleFactor)); // Ensure a minimum timeout value

    function typeNextChar() {
        if (i < text.length) {
            botMessageDiv.innerHTML += text.charAt(i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight; // Keep scrolling as new characters are added
            setTimeout(typeNextChar, dynamicTimeout); // Use the dynamically calculated timeout
        }
    }

    typeNextChar();
}


function handleInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

window.onload = function() {
    // Display the initial message from Buddy
    const chatBox = document.getElementById("chat-box");
    const botMessage = "Hi, my name is Buddy! How can I help you today?";
    
    // Create the bot message element
    const botMessageElement = document.createElement("div");
    botMessageElement.className = "message bot-message";
    botMessageElement.innerText = botMessage;
    
    // Add the message to the chat box
    typeWriterEffect(botMessage, chatBox);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom if necessary
};

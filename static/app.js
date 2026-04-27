const form = document.getElementById("chatForm");
const input = document.getElementById("inp");
const chatBox = document.getElementById("chatBox");

/* Scroll to chat */
function scrollToChat() {
  document.getElementById("chatSection").scrollIntoView({
    behavior: "smooth",
  });
}

/* Submit */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const typing = addTyping();

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: userText }),
    });

    const data = await res.json();

    typing.remove();

    addMessage(data.response || data.answer || "No response", "bot");
  } catch (err) {
    typing.remove();
    addMessage("Error connecting to server", "bot");
  }
});

/* Add message */
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* Typing animation */
function addTyping() {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot");

  msg.innerHTML = `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

function scrollToChat() {
  document.getElementById("chatSection").scrollIntoView({
    behavior: "smooth",
  });
}

// // document.getElementById("chatForm").onsubmit = async (e) => {
// //   e.preventDefault();

// //   let formData = new FormData(e.target);
// //   console.log(formData);

// //   let loader = document.getElementById("loader");
// //   loader.style.display = "block";

// //   let response = await fetch("/ask", {
// //     method: "POST",
// //     body: formData,
// //   });

// //   let data = await response.json();

// //   let ans = document.getElementById("answer");
// //   ans.innerText = data.response;

// //   loader.style.display = "none";
// //   document.getElementById("inp").value = "";
// // };

// const form = document.getElementById("chatForm");
// const input = document.getElementById("inp");
// const chatBox = document.getElementById("chatBox");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const userText = input.value.trim();
//   if (!userText) return;

//   // Add user message
//   addMessage(userText, "user");

//   input.value = "";
//   input.focus();

//   // Show typing indicator
//   const typingMsg = addTyping();

//   try {
//     const res = await fetch("/ask", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ query: userText }),
//     });

//     const data = await res.json();

//     // Remove typing
//     typingMsg.remove();

//     // Add bot response
//     addMessage(data.answer || data.response || "No response", "bot");

//   } catch (err) {
//     typingMsg.remove();
//     addMessage("⚠️ Error connecting to server", "bot");
//     console.error(err);
//   }
// });

// /* -----------------------------
//    Add message to chat
// ------------------------------ */
// function addMessage(text, type) {
//   const msg = document.createElement("div");
//   msg.classList.add("message", type);
//   msg.innerText = text;

//   chatBox.appendChild(msg);

//   // Auto scroll
//   chatBox.scrollTop = chatBox.scrollHeight;
// }

// /* -----------------------------
//    Typing animation
// ------------------------------ */
// function addTyping() {
//   const msg = document.createElement("div");
//   msg.classList.add("message", "bot");

//   msg.innerHTML = `
//     <span class="dot"></span>
//     <span class="dot"></span>
//     <span class="dot"></span>
//   `;

//   chatBox.appendChild(msg);
//   chatBox.scrollTop = chatBox.scrollHeight;

//   return msg;
// }

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

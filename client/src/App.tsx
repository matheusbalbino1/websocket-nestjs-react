import { useState } from "react";
import "./App.css";
import { useChat } from "./useChat";

function App() {
  const { messages, sendMessage, openSnackbar } = useChat();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username)
      return openSnackbar("Please enter your name before sending a message");
    const { currentTarget } = e;
    sendMessage(currentTarget.message.value, username);
    currentTarget.message.value = "";
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>WEBSOCKET - NESTJS - REACT - VITE</h1>
          <section className="data-user">
            <label htmlFor="username">
              <i className="bi bi-person-circle"></i>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </section>
          <section className="messages-chat">
            {messages.map((message) => {
              if (message.username === username) {
                return (
                  <div className="your-message message">
                    <span>{message.username}</span>
                    <p>{message.text}</p>
                  </div>
                );
              }
              return (
                <div className="foreign-message message">
                  <span>{message.username}</span>
                  <p>{message.text}</p>
                </div>
              );
            })}
          </section>

          <div className="send-message">
            <input type="text" placeholder="Type your message" name="message" />
            <button type="submit">
              <i className="bi bi-send"></i>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;

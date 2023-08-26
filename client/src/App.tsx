import "./App.css";
import { useChat } from "./useChat";

function App() {
  const { messages } = useChat();

  return (
    <main>
      <div>
        <h1>WEBSOCKET - NESTJS - REACT - VITE</h1>
        <section className="data-user">
          <label htmlFor="username">
            <i className="bi bi-person-circle"></i>
          </label>
          <input id="username" type="text" placeholder="Your name" />
        </section>
        <section className="messages-chat">
          <div className="your-message message">
            <span>Matheus</span>
            <p>Olá, tudo bem?</p>
          </div>
          <div className="foreign-message message">
            <span>Matheus</span>
            <p>Olá, tudo bem?</p>
          </div>
          <div className="foreign-message message">
            <span>Matheus</span>
            <p>Olá, tudo bem?</p>
          </div>
          <div className="your-message message">
            <span>Matheus</span>
            <p>Olá, tudo bem?</p>
          </div>
          <div className="your-message message">
            <span>Matheus</span>
            <p>Olá, tudo bem?</p>
          </div>
        </section>
        <form className="send-message">
          <input type="text" placeholder="Type your message" />
          <button type="submit">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;

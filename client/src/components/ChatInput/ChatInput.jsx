import "./ChatInput.css";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  return (
    <form className="chat-input">
      <input type="text" placeholder="Type somthing" />
      <button>
        <SendIcon color="primary" />
      </button>
    </form>
  );
};

export default ChatInput;

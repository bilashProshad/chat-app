import "./ChatInput.css";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  onClick,
  className,
  ...rest
}) => {
  return (
    <form className={`chat-input ${className}`} onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Type somthing"
        {...rest}
      />
      <button type="submit" onClick={onClick}>
        <SendIcon color="primary" />
      </button>
    </form>
  );
};

export default ChatInput;

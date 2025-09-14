import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { utilService } from "../services/utilService";
import { ChatState } from "../models/ChatState";
import { User } from "../models/User";
import { GameState } from "../models/GameState";

interface Props {
  gameState: GameState | null;
  loggedInUser: User | null;
  chatState: ChatState | null;
  saveChat: (chatToUpdate: ChatState) => Promise<ChatState>;
  getChatById: (
    chatId: string,
    setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
  ) => Promise<ChatState>;
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>;
}

export const Chat = ({
  chatState,
  loggedInUser,
  saveChat,
  getChatById,
  gameState,
  setChatState,
}: Props) => {
  const [msg, setMsg] = useState("");

  const createMsg = (txt: string) => {
    return {
      _id: utilService.makeId(24),
      userId: loggedInUser?._id || "",
      txt,
      fullname: loggedInUser?.fullname || "Guest",
    };
  };

  const isBlackUser = (userId: string) => userId === gameState?.players?.black;

  const sendMsg = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!msg.trim().length) return;
    if (ev.key === "Enter" || ev.keyCode === 13) {
      const newMsg = createMsg(msg);
      const chatToSave = cloneDeep(chatState);
      chatToSave?.messages.push(newMsg);
      chatToSave && saveChat(chatToSave);
      setMsg("");
    }
  };

  const sendAutoMsg = (msg: string) => {
    const newMsg = createMsg(msg);
    const chatToSave = cloneDeep(chatState);
    chatToSave?.messages.push(newMsg);
    chatToSave && saveChat(chatToSave);
  };

  useEffect(() => {
    // saving the black user into the chat (because sometimes not recognize the user on first load)
    if (chatState && !chatState.userId2 && gameState?.players?.black) {
      const chatToSave = cloneDeep(chatState);
      chatToSave.userId2 = gameState.players.black;
      chatToSave && saveChat(chatToSave);
    }
  }, [chatState, gameState, gameState?.players?.black, saveChat, setChatState]);

  useEffect(() => {
    if (gameState?.chatId) {
      getChatById(gameState.chatId, setChatState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.chatId]);

  if (!gameState?.isOnline)
    return (
      <div
        className="backdrop-blur-md bg-surface-glass border border-glass-border rounded-xl h-[560px] flex flex-col justify-center items-center max-md:hidden p-8"
        style={{ gridArea: "chat" }}
      >
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-text-primary font-semibold text-lg mb-2">
          Offline Mode
        </h3>
        <p className="text-text-secondary text-center text-sm">
          Enjoy your local chess game!
          <br />
          Chat is available in online games.
        </p>
      </div>
    );

  const quickMessages = [
    { key: "HI", message: "Hello", emoji: "👋" },
    { key: "GL", message: "Good luck", emoji: "🍀" },
    { key: "HF", message: "Have fun!", emoji: "😊" },
    { key: "GG", message: "Good game!", emoji: "🤝" },
  ];

  return (
    <div
      className="backdrop-blur-md bg-surface-glass border border-glass-border rounded-xl h-[560px] max-md:hidden flex flex-col"
      style={{ gridArea: "chat" }}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm">💬</span>
          </div>
          <div>
            <h2 className="text-text-primary font-semibold">Chat</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></div>
              <span className="text-xs text-text-muted">Live chat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatState?.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-2">🤝</div>
            <p className="text-text-muted text-sm">No messages yet</p>
            <p className="text-text-muted text-xs">Start the conversation!</p>
          </div>
        ) : (
          <>
            {chatState?.messages.map((message, index) => {
              const isCurrentUser = message.userId === loggedInUser?._id;
              const isBlackPlayerMessage = isBlackUser(message.userId);

              return (
                <div
                  key={message._id}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`max-w-[80%] ${
                      isCurrentUser ? "order-2" : "order-1"
                    }`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`
                        rounded-2xl px-4 py-2 shadow-sm
                        ${
                          isCurrentUser
                            ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-br-sm"
                            : "bg-surface-elevated text-text-primary rounded-bl-sm border border-glass-border"
                        }
                      `}
                    >
                      {/* Player info for other users */}
                      {!isCurrentUser && (
                        <div className="flex items-center space-x-2 mb-1">
                          <div
                            className={`
                            w-4 h-4 rounded-full flex items-center justify-center text-xs
                            ${
                              isBlackPlayerMessage
                                ? "bg-gray-800 text-white"
                                : "bg-yellow-400 text-gray-800"
                            }
                          `}
                          >
                            {isBlackPlayerMessage ? "♛" : "♕"}
                          </div>
                          <span className="text-xs font-medium opacity-80">
                            {message.fullname}
                          </span>
                        </div>
                      )}

                      {/* Message text */}
                      <p className="text-sm leading-relaxed break-words">
                        {message.txt}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p
                      className={`
                      text-xs text-text-muted mt-1 px-1
                      ${isCurrentUser ? "text-right" : "text-left"}
                    `}
                    >
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-glass-border">
        {/* Text Input */}
        <div className="relative mb-3">
          <input
            value={msg}
            type="text"
            onKeyUp={sendMsg}
            onChange={(ev) => setMsg(ev.target.value)}
            placeholder="Type a message..."
            className="
              w-full px-4 py-3 rounded-xl
              bg-surface-elevated border border-glass-border
              text-text-primary placeholder-text-muted
              focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary
              transition-all duration-200
            "
          />

          {/* Send indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-text-muted text-xs">
              {msg.trim() ? "Press Enter" : "💬"}
            </span>
          </div>
        </div>

        {/* Quick Messages */}
        <div className="grid grid-cols-4 gap-2">
          {quickMessages.map((quick) => (
            <button
              key={quick.key}
              onClick={() => sendAutoMsg(quick.message)}
              title={quick.message}
              className="
                flex flex-col items-center justify-center p-2 rounded-lg
                bg-surface-elevated hover:bg-accent-primary/20 border border-glass-border
                text-text-secondary hover:text-accent-primary
                transition-all duration-200 hover:scale-105
                group
              "
            >
              <span className="text-lg mb-1 group-hover:scale-110 transition-transform duration-200">
                {quick.emoji}
              </span>
              <span className="text-xs font-medium">{quick.key}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

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
    return <div className="chat not-online">Have fun !</div>;

  // console.log('render Chat.tsx')
  return (
    <>
      <div className="chat">
        <header>
          <h1>Chat room</h1>
        </header>
        <div className="body">
          {chatState?.messages.map((msg) => (
            <div key={msg._id}>
              <span>
                {`${msg.fullname} ${
                  isBlackUser(msg.userId) ? "[black]" : "[white]"
                }:  ${msg.txt}`}
              </span>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            value={msg}
            type="text"
            onKeyUp={(ev) => sendMsg(ev)}
            onChange={(ev) => setMsg(ev.target.value)}
            placeholder="Please be nice in the chat!"
          />
        </div>
        <div className="auto-msg">
          <span
            onClick={() => {
              sendAutoMsg("Hello");
            }}
            title="Hello"
          >
            HI
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Good luck");
            }}
            title="Good luck"
          >
            GL
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Have fun!");
            }}
            title="Have fun!"
          >
            HF
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Yoo too!");
            }}
            title="Yoo too!"
          >
            U2
          </span>
        </div>
      </div>
    </>
  );
};

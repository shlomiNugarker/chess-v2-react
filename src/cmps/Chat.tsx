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
    return <div className="bg-tertiary text-secondary h-[560px] flex justify-center items-center max-md:hidden">Have fun !</div>;

  // console.log('render Chat.tsx')
  return (
    <>
      <div className="bg-tertiary text-secondary h-[560px] max-md:hidden" style={{gridArea: 'chat'}}>
        <header className="h-[10%]">
          <h1 className="text-[25px] p-[3px_5px]">Chat room</h1>
        </header>
        <div className="h-[80%] overflow-y-auto overflow-x-hidden flex flex-col justify-end">
          {chatState?.messages.map((msg) => (
            <div key={msg._id} className="flex justify-start items-center p-[3px_5px]">
              <span>
                {`${msg.fullname} ${
                  isBlackUser(msg.userId) ? "[black]" : "[white]"
                }:  ${msg.txt}`}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-[5%]">
          <input
            value={msg}
            type="text"
            onKeyUp={(ev) => sendMsg(ev)}
            onChange={(ev) => setMsg(ev.target.value)}
            placeholder="Please be nice in the chat!"
            className="bg-[#24221e] text-secondary w-full border-0 border-t border-[#404040] rounded-none p-[3px_20px_3px_4px] text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex h-[5%] border border-[#404040]">
          <span
            onClick={() => {
              sendAutoMsg("Hello");
            }}
            title="Hello"
            className="w-1/4 flex justify-center items-center cursor-pointer break-words border-r border-[#404040] last:border-r-0"
          >
            HI
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Good luck");
            }}
            title="Good luck"
            className="w-1/4 flex justify-center items-center cursor-pointer break-words border-r border-[#404040] last:border-r-0"
          >
            GL
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Have fun!");
            }}
            title="Have fun!"
            className="w-1/4 flex justify-center items-center cursor-pointer break-words border-r border-[#404040] last:border-r-0"
          >
            HF
          </span>
          <span
            onClick={() => {
              sendAutoMsg("Yoo too!");
            }}
            title="Yoo too!"
            className="w-1/4 flex justify-center items-center cursor-pointer break-words border-r border-[#404040] last:border-r-0"
          >
            U2
          </span>
        </div>
      </div>
    </>
  );
};

import { User } from "../models/User";

import { GameState } from "../models/GameState";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { utilService } from "../services/utilService";

interface Props {
  gameState: GameState | null;
  loggedInUser: User | null;
  moveInStateHistory: (num: 1 | -1) => void;
  whitePlayer: User | null;
  blackPlayer: User | null;
  isWhitePlayerConnected: boolean;
  isBlackPlayerConnected: boolean;
}

export const GameDetails = ({
  gameState,
  loggedInUser,
  moveInStateHistory,
  whitePlayer,
  blackPlayer,
  isWhitePlayerConnected,
  isBlackPlayerConnected,
}: Props) => {
  const screenStyle =
    gameState?.players?.black === loggedInUser?._id
      ? "black-screen"
      : "white-screen";

  // console.log('render GameDetails.tsx')
  return (
    <section className="text-secondary flex w-full max-md:hidden" style={{gridArea: 'game-details'}}>
      <div className={`w-full flex justify-center flex-col ${screenStyle}`}>
        <div className={`${screenStyle}`}>
          <div className="flex items-center flex-wrap">
            {gameState?.eatenPieces.black.map((piece, idx) => (
              <span key={piece + idx} className="text-[30px]">{piece}</span>
            ))}
          </div>
          <div
            className={`text-[40px] bg-tertiary inline ${screenStyle} ${
              gameState?.isBlackTurn ? "curr-turn-bg" : ""
            }`}
          >
            {gameState?.remainingTime?.black &&
              utilService.millisToMinutesAndSeconds(
                gameState.remainingTime.black
              )}
          </div>
          <div
            className="timer-bar"
            style={{
              width:
                gameState?.remainingTime?.black &&
                utilService.timeToPercents(gameState.remainingTime.black),
            }}
          ></div>
          <div className="bg-tertiary flex justify-start items-center">
            <span
              className={
                isBlackPlayerConnected
                  ? "is-connected connected"
                  : "is-connected"
              }
            ></span>
            <p>{blackPlayer?.fullname}</p>
          </div>
        </div>
        <div className="min-h-[100px] flex items-center justify-center">
          <div className="w-full flex items-center justify-around">
            <span 
              onClick={() => moveInStateHistory(-1)}
              className="flex items-center justify-center hover:bg-[#384722] cursor-pointer"
            >
              <AiFillCaretLeft className="text-[50px]" />
            </span>
            <span 
              onClick={() => moveInStateHistory(1)}
              className="flex items-center justify-center hover:bg-[#384722] cursor-pointer"
            >
              <AiFillCaretRight className="text-[50px]" />
            </span>
          </div>
        </div>
        {/* <div className="actions"></div> */}
        <div className={`${screenStyle}`}>
          <div className="bg-tertiary flex justify-start items-center">
            <span
              className={
                isWhitePlayerConnected
                  ? "is-connected connected"
                  : "is-connected"
              }
            ></span>
            <p>{whitePlayer?.fullname}</p>
          </div>
          <div
            className="timer-bar"
            style={{
              width:
                gameState?.remainingTime?.white &&
                utilService.timeToPercents(gameState.remainingTime.white),
            }}
          ></div>
          <div
            className={`text-[40px] bg-tertiary inline ${
              !gameState?.isBlackTurn ? "curr-turn-bg" : ""
            }`}
          >
            {gameState?.remainingTime?.white &&
              utilService.millisToMinutesAndSeconds(
                gameState.remainingTime.white
              )}
          </div>
          <div className="flex items-center flex-wrap">
            {gameState?.eatenPieces.white.map((piece, idx) => (
              <span key={piece + idx} className="text-[30px]">{piece}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

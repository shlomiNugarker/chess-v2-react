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
    <section className="game-details">
      <div className={"container " + screenStyle}>
        <div className={"black-player " + screenStyle}>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.black.map((piece, idx) => (
              <span key={piece + idx}>{piece}</span>
            ))}
          </div>
          <div
            className={`timer ${screenStyle} ${
              gameState?.isBlackTurn ? "curr-turn-bg " : ""
            }`}
          >
            {gameState?.remainingTime?.black &&
              utilService.millisToMinutesAndSeconds(
                gameState.remainingTime.black
              )}
          </div>
          <div
            className="bar"
            style={{
              width:
                gameState?.remainingTime?.black &&
                utilService.timeToPercents(gameState.remainingTime.black),
            }}
          ></div>
          <div className="player-name">
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
        <div className="moves">
          <div>
            <span onClick={() => moveInStateHistory(-1)}>
              <AiFillCaretLeft />
            </span>
            <span onClick={() => moveInStateHistory(1)}>
              <AiFillCaretRight />
            </span>
          </div>
        </div>
        {/* <div className="actions"></div> */}
        <div className={"white-player " + screenStyle}>
          <div className="player-name">
            <span
              className={
                isWhitePlayerConnected
                  ? "is-connected connected"
                  : "is-connected "
              }
            ></span>
            <p>{whitePlayer?.fullname}</p>
          </div>
          <div
            className="bar"
            style={{
              width:
                gameState?.remainingTime?.white &&
                utilService.timeToPercents(gameState.remainingTime.white),
            }}
          ></div>
          <div
            className={`timer ${
              !gameState?.isBlackTurn ? "curr-turn-bg " : ""
            }`}
          >
            {gameState?.remainingTime?.white &&
              utilService.millisToMinutesAndSeconds(
                gameState.remainingTime.white
              )}
          </div>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.white.map((piece, idx) => (
              <span key={piece + idx}>{piece}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
  const isBlackPlayer = gameState?.players?.black === loggedInUser?._id;
  const screenStyle = isBlackPlayer ? "black-screen" : "white-screen";

  const PlayerCard = ({
    player,
    isConnected,
    isBlackPlayerCard,
    timer,
    capturedPieces,
    isCurrentTurn
  }: {
    player: User | null;
    isConnected: boolean;
    isBlackPlayerCard: boolean;
    timer: number | undefined;
    capturedPieces: string[];
    isCurrentTurn: boolean;
  }) => (
    <div className={`
      backdrop-blur-md bg-surface-glass border border-glass-border rounded-xl p-4
      transition-all duration-300 animate-fade-in
      ${isCurrentTurn ? 'ring-2 ring-accent-primary/50 bg-accent-primary/5' : ''}
      ${isBlackPlayer && isBlackPlayerCard ? 'order-last' : ''}
    `}>
      {/* Player Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
            ${isBlackPlayerCard
              ? 'bg-gradient-to-br from-gray-700 to-black text-white'
              : 'bg-gradient-to-br from-yellow-200 to-yellow-500 text-gray-800'
            }
          `}>
            {isBlackPlayerCard ? '♛' : '♕'}
          </div>

          {/* Player Name & Status */}
          <div>
            <h3 className="text-text-primary font-semibold">
              {player?.fullname || 'Anonymous'}
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`
                w-2 h-2 rounded-full transition-colors duration-300
                ${isConnected ? 'bg-accent-success animate-pulse' : 'bg-accent-error'}
              `}></div>
              <span className="text-xs text-text-muted">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Turn Indicator */}
        {isCurrentTurn && (
          <div className="flex items-center space-x-1 bg-accent-primary/20 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-accent-primary font-medium">Turn</span>
          </div>
        )}
      </div>

      {/* Timer */}
      {timer && (
        <div className="mb-3">
          <div className={`
            text-2xl font-mono text-center py-2 px-3 rounded-lg
            ${isCurrentTurn
              ? 'bg-accent-primary text-white'
              : 'bg-surface-elevated text-text-secondary'
            }
          `}>
            {utilService.millisToMinutesAndSeconds(timer)}
          </div>

          {/* Timer Bar */}
          <div className="mt-2 h-1 bg-surface-elevated rounded-full overflow-hidden">
            <div
              className={`
                h-full transition-all duration-1000 ease-linear
                ${isCurrentTurn
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary'
                  : 'bg-text-muted'
                }
              `}
              style={{
                width: timer ? utilService.timeToPercents(timer) : '0%'
              }}
            />
          </div>
        </div>
      )}

      {/* Captured Pieces */}
      {capturedPieces.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs text-text-muted font-medium">Captured</h4>
          <div className="flex flex-wrap gap-1 min-h-[40px] p-2 bg-surface-elevated rounded-lg">
            {capturedPieces.map((piece, idx) => (
              <span
                key={piece + idx}
                className="text-2xl hover:scale-110 transition-transform duration-200 cursor-default"
                title={`Captured ${piece}`}
              >
                {piece}
              </span>
            ))}
            {capturedPieces.length === 0 && (
              <span className="text-text-muted text-sm italic">No captures yet</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="text-text-secondary flex w-full max-md:hidden" style={{gridArea: 'game-details'}}>
      <div className="w-full space-y-4">

        {/* Black Player Card */}
        <PlayerCard
          player={blackPlayer}
          isConnected={isBlackPlayerConnected}
          isBlackPlayerCard={true}
          timer={gameState?.remainingTime?.black}
          capturedPieces={gameState?.eatenPieces.black || []}
          isCurrentTurn={gameState?.isBlackTurn || false}
        />

        {/* Game Controls */}
        <div className="backdrop-blur-md bg-surface-glass border border-glass-border rounded-xl p-4">
          <h3 className="text-text-primary font-semibold mb-4 text-center">Game History</h3>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => moveInStateHistory(-1)}
              className="
                flex items-center justify-center w-12 h-12 rounded-xl
                bg-surface-elevated hover:bg-accent-primary/20 border border-glass-border
                text-text-secondary hover:text-accent-primary
                transition-all duration-200 hover:scale-105 hover:shadow-glow
              "
              title="Previous move"
            >
              <AiFillCaretLeft className="text-xl" />
            </button>

            <div className="px-4 py-2 bg-surface-elevated rounded-lg">
              <span className="text-text-muted text-sm">Move Navigation</span>
            </div>

            <button
              onClick={() => moveInStateHistory(1)}
              className="
                flex items-center justify-center w-12 h-12 rounded-xl
                bg-surface-elevated hover:bg-accent-primary/20 border border-glass-border
                text-text-secondary hover:text-accent-primary
                transition-all duration-200 hover:scale-105 hover:shadow-glow
              "
              title="Next move"
            >
              <AiFillCaretRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* White Player Card */}
        <PlayerCard
          player={whitePlayer}
          isConnected={isWhitePlayerConnected}
          isBlackPlayerCard={false}
          timer={gameState?.remainingTime?.white}
          capturedPieces={gameState?.eatenPieces.white || []}
          isCurrentTurn={!gameState?.isBlackTurn || false}
        />

        {/* Game Status */}
        <div className="backdrop-blur-md bg-surface-glass border border-glass-border rounded-xl p-4">
          <div className="text-center">
            <div className="text-text-muted text-xs mb-1">Game Status</div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></div>
              <span className="text-text-primary text-sm font-medium">Active Game</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { MouseEventHandler } from "react";

const PlayAgain = (props: { 
    gameStatus: string; 
    onClick: Function;
  }) => {
  return (
    <div className="game-done">
      <div 
        className="message"
        style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
      >
        {props.gameStatus === 'lost' ? "Game Over" : "You Won!"}
      </div>
      <button onClick={props.onClick as MouseEventHandler<HTMLElement>}>
        Play Again
      </button>
    </div>
  );
};

export default PlayAgain;
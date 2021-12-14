import { useState } from "react";
import Game from "./Game";

const StarMatch = () => {
  // when we click the PlayAgain button, React will unmount gameId 1 and mount gameId 2 and so on.
  // This will provide us with a brand new state. It clears up all the side effects too.
  const [gameId, setGameId] = useState(1 as number);
  return <Game key={gameId} startNewGame={(() => setGameId(gameId + 1)) as Function} />;
};

export default StarMatch;
import { useState, useEffect } from "react";
import './style/styling.css';

const StarsDisplay = props => {
  return (
    // empty JSX tag represents a React.fragment
    <>
      {utils.range(1, props.count).map(starId => 
        <div key={starId} className="star" />)}
    </>
  );
};

const PlayNumber = props => {
  return (
    <button 
      className="number" 
      style={{ backgroundColor: colors[props.status] }}
      onClick={ () => props.onClick(props.number, props.status) }
    >
      {props.number}
    </button>
  );
};

const PlayAgain = props => {
  return (
    <div className="game-done">
      <div 
        className="message"
        style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
      >
        {props.gameStatus === 'lost' ? "Game Over" : "You Won!"}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

// Custom Hook
const useGameState = () => {
  // This manages the state.
  // (1) It initializes the state for us and 
  // (2) provides a behavior to transact on the state with 'setGameState' function
  const [stars, setStars] = useState(utils.random(1,9));
  const [availableNums, setAvailableNums] = useState(utils.range(1,9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);  // cleanup callback on re-render
    }
  });
  
  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    }
    else {
      // correct picks
      const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }
  
  // return an object that exposes the things that the Game component needs
  return { 
    stars, 
    availableNums, 
    candidateNums, 
    secondsLeft, 
    setGameState /* the function we defined in this custom hook */
  };
};

const Game = (props) => {
  const { 
    stars, 
    availableNums, 
    candidateNums, 
    secondsLeft, 
    setGameState
  } = useGameState();
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const isGameWon = availableNums.length === 0;
  const isGameLost = secondsLeft <= 0;
  const gameStatus = isGameWon ? 'won' : isGameLost ? 'lost' : 'active';
  
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };
  
  const onNumberClick = (number, currentStatus) => {
    if(gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }
    const newCandidateNums = currentStatus === 'available' 
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };
  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' 
            ? <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
            : <StarsDisplay count={stars} />
          }
        </div>
        <div className="right">
          {utils.range(1,9).map((number, index) => 
            <PlayNumber 
              key={index} 
              number={number} 
              status={numberStatus(number)} 
              onClick={onNumberClick}
            />)}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  // when we click the PlayAgain button, React will unmount gameId 1 and mount gameId 2 and so on.
  // This will provide us with a brand new state. It clears up all the side effects too.
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch;
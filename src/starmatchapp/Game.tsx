import React, { useState, useEffect } from "react";
import Colors from "./colors";
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import utils from "./utils";

// Custom Hook
const useGameState: Function = () => {
  // This manages the state.
  // (1) It initializes the state for us and 
  // (2) provides a behavior to transact on the state with 'setGameState' function
  const [stars, setStars] = useState(utils.random(1,9) as number);
  const [availableNums, setAvailableNums] = useState(utils.range(1,9) as number[]);
  const [candidateNums, setCandidateNums] = useState([] as number[]);
  const [secondsLeft, setSecondsLeft] = useState(10 as number);
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);  // cleanup callback on re-render
    }
  });
  
  const setGameState: Function = (newCandidateNums: any) => {
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

const Game = (props: { key:number; startNewGame: Function; }) => {
  const { 
    stars, 
    availableNums, 
    candidateNums, 
    secondsLeft, 
    setGameState
  } = useGameState();
  
  const candidatesAreWrong: boolean = utils.sum(candidateNums) > stars;
  const isGameWon: boolean = availableNums.length === 0;
  const isGameLost: boolean = secondsLeft <= 0;
  const gameStatus: string = isGameWon ? 'won' : isGameLost ? 'lost' : 'active';
  
  const numberStatus: Function = (number: number) => {
    if (!availableNums.includes(number)) {
      return Colors.Used;
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? Colors.Wrong : Colors.Candidate;
    }
    return Colors.Available;
  };
  
  const onNumberClick: Function = (number: number, currentStatus: Colors) => {
    if(gameStatus !== 'active' || currentStatus === Colors.Used) {
      return;
    }
    const newCandidateNums = currentStatus === Colors.Available 
      ? candidateNums.concat(number)
      : candidateNums.filter((cn: number) => cn !== number);

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
              key={index + 1} 
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

export default Game;
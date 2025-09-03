import { useState, Fragment } from 'react'
import './css/App.css'

import Cons from './Cons';
import Board from './components/Board';
import Set from './components/Set';
import Win from './components/Win';

function App() {

  var defaultBoardXSize = 4;
  var defaultBoardYSize = 2;

  const [gameStatus, setGameStatus] = useState(Cons.GAME_STATUS_SET);

  const [boardXSize, setBoardXSize] = useState(defaultBoardXSize);
  const [boardYSize, setBoardYSize] = useState(defaultBoardYSize);
  
  const [emptySpace, setEmptySpace] = useState([boardXSize-1,boardYSize-1]);
  const [puzzlePlaces, setPuzzlePlaces] = useState();

  function generateSet() {
    var boardSizeHandle = {
      emptySpace,
      boardXSize,
      boardYSize,
      setEmptySpace,
      setBoardXSize,
      setBoardYSize,
      setGameStatus
    }

    return <Set boardSizeHandle={boardSizeHandle} />
  }

  function generateBoard(x, y) {
    if (puzzlePlaces == undefined) 
      return false

    var size = {x, y}
    var boardHandle = {
      emptySpace,
      puzzlePlaces,
      setEmptySpace,
      setPuzzlePlaces
    }

    return <Board size={size} boardHandle={boardHandle} />
  }

  function generateWin() {
    return <Win />
  }

  function checkIfGameWon(_puzzlePlaces) {
    if (_puzzlePlaces == undefined) {
      return false
    }

    var game_won = true;
    _puzzlePlaces.slice(0,-1).forEach((puzzle, index) => {
      if ((index+1) != puzzle.value) 
        game_won = false
    });

    if (gameStatus == Cons.GAME_STATUS_PLAY && game_won) {
      setGameStatus(Cons.GAME_STATUS_WIN)
    }

    return game_won;
  }

  function rollPuzzlePlaces () {
    var usedPlaces = [];
    
    var size = boardXSize * boardYSize;
    var newPuzzlePlaces = new Array(size);
    
    function generateRandomPlace(min, max) {
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      return (usedPlaces.includes(num)) ? generateRandomPlace(min, max) : num;
    }
    
    function generateRandomBoard() {
      usedPlaces = []

      newPuzzlePlaces[(size-1)] = {
        x: boardXSize,
        y: boardYSize,
        value: 0
      }

      usedPlaces.push(0)

      var pos = 0
      var value
      for (var i=0; i<boardXSize; i++) {
        for (var j=0; j<boardYSize; j++) {
          if (i==0 && j==0) continue

          value = generateRandomPlace(0, (size-1))
          usedPlaces.push(value)

          if (value == 0) {
            setEmptySpace([i,j])
          }

          newPuzzlePlaces[pos] = {
            x: i,
            y: j,
            value: value
          }
          
          pos++
        }
      }
    }

    function countInversions() {
      var inversions = 0;

      newPuzzlePlaces.forEach((puzzle, index) => {
        if (puzzle.value != 0) {
          newPuzzlePlaces.slice(index+1).forEach(checkPuzzle => {
            if (checkPuzzle.value != 0 && puzzle.value > checkPuzzle.value) {
              inversions++
            }
          })
        }
      })

      return inversions;
    }

    var roll = true
    while (roll) {
      generateRandomBoard();
      if (countInversions() % 2 == 0) {
        if (checkIfGameWon(newPuzzlePlaces) == false) {
          roll = false
        }
      }
    }
    
    setGameStatus(Cons.GAME_STATUS_PLAY)
    setPuzzlePlaces(newPuzzlePlaces);
  }

  var app;
  switch (gameStatus) {
    case Cons.GAME_STATUS_SET:
      app = generateSet();
      
      break;
    case Cons.GAME_STATUS_ROLL:
      rollPuzzlePlaces();
      
      break;
    case Cons.GAME_STATUS_PLAY:
      checkIfGameWon(puzzlePlaces);
      
      app = generateBoard(boardXSize, boardYSize);
      
      break;
    case Cons.GAME_STATUS_WIN:
      app = generateWin();

      break;
    default:
      break;
  }

  return (
    <>
      <div className='title'>
        SLIDE PUZZLE
      </div>
      {app}
    </>
  )
}

export default App

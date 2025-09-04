import { useState, useRef, useEffect, Fragment } from 'react'
import { useWindowSize } from 'react-use'
import './css/App.css'

import Cons from './Cons';
import Board from './components/Board';
import Set from './components/Set';
import Win from './components/Win';

function App() {

  const { width, height } = useWindowSize()

  var defaultBoardXSize = 3;
  var defaultBoardYSize = 3;

  const [gameStatus, setGameStatus] = useState(Cons.GAME_STATUS_SET);

  const [boardXSize, setBoardXSize] = useState(defaultBoardXSize);
  const [boardYSize, setBoardYSize] = useState(defaultBoardYSize);
  
  const movesCount = useRef(0);
  const [emptySpace, setEmptySpace] = useState([boardXSize-1, boardYSize-1]);
  const [puzzlePlaces, setPuzzlePlaces] = useState();

  function reset() {
    movesCount.current = 0
    setGameStatus(Cons.GAME_STATUS_SET)
  }

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
    return <Win movesCount={movesCount} reset={reset} />
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
    
    setPuzzlePlaces(newPuzzlePlaces)
    setGameStatus(Cons.GAME_STATUS_PLAY)
  }

  var app;
  switch (gameStatus) {
    case Cons.GAME_STATUS_SET:
      app = generateSet()
      
      break;
    case Cons.GAME_STATUS_ROLL:
      rollPuzzlePlaces()
      
      break;
    case Cons.GAME_STATUS_PLAY:
      if (!checkIfGameWon(puzzlePlaces)) {
        movesCount.current = movesCount.current + 1;
        
        app = generateBoard(boardXSize, boardYSize)
      }

      break;
    case Cons.GAME_STATUS_WIN:
      app = generateWin()

      break;
    default:
      break;
  }

  useEffect(() => {
    document.getElementById('root').style.height = height + "px";
    document.getElementById('root').style.width = width + "px";

    if (gameStatus == Cons.GAME_STATUS_PLAY) {
      var puzzles = document.getElementById('board').getElementsByTagName('td');
      var puzzle_height = (height - 200) / boardXSize

      for (const puzzle of puzzles) {
        puzzle.style.height = puzzle_height + "px"
      }

      var puzzleHeight = document.getElementsByTagName('td').item(0).clientHeight;
      if (puzzleHeight > 100) {
        puzzleHeight = 60
      } else {
        puzzleHeight = puzzleHeight - 40
      }

      document.getElementById('board').style.fontSize = puzzleHeight + "px";
    }

  }, [gameStatus]); 

  return (
    <>
      <div className='title'>
        slide puzzle
      </div>
      {app}
    </>
  )
}

export default App

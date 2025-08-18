import { useState, useEffect, Fragment } from 'react'
import './css/App.css'

import Cons from './Cons';
import Board from './components/Board';
import Set from './components/Set';

function App() {
  const [gameStatus, setGameStatus] = useState(Cons.GAME_STATUS_SET);

  const [boardXSize, setBoardXSize] = useState(4);
  const [boardYSize, setBoardYSize] = useState(3);
  
  const [emptySpace, setEmptySpace] = useState([0,0]);
  const [puzzlePlaces, setPuzzlePlaces] = useState();

  function generateSet() {
    var boardSizeHandle = {
      boardXSize,
      boardYSize,
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

  function rollPuzzlePlaces () {
    var newPuzzlePlaces = new Array(boardXSize * boardYSize);

    var pos = 0
    for (var i=0; i<boardXSize; i++) {
      for (var j=0; j<boardYSize; j++) {
        newPuzzlePlaces[pos] = {
          x: i,
          y: j,
          value: pos
        }
        
        pos++;
      }
    }

    setPuzzlePlaces(newPuzzlePlaces);
  }

  var app;
  switch (gameStatus) {
    case Cons.GAME_STATUS_SET:
      app = generateSet();
      
      break;
      
    case Cons.GAME_STATUS_PLAY:
      app = generateBoard(boardXSize, boardYSize);
      
      break;
    default:
      break;
  }
    
  useEffect(() => {
    if (gameStatus == Cons.GAME_STATUS_PLAY) {
      rollPuzzlePlaces();
    }
  }, [gameStatus]);

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

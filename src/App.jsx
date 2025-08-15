import { useState, Fragment } from 'react'
import './App.css'

import Board from './Board';

function App() {
  const [emptySpace, setEmptySpace] = useState([0,0]);



  function changeEmptySpace(newEmptySpace) {
    setEmptySpace(newEmptySpace);
  }

  function generateBoard(x, y) {
    var size = {x, y}
    var emptySpaceHandle = {
      emptySpace,
      "func": changeEmptySpace
    }
    return <Board size={size} emptySpaceHandle={emptySpaceHandle} />
  }
  
  const board = generateBoard(4,3);

  return (
    <>
      <div className='title'>
        SLIDE PUZZLE
      </div>
      {board}
    </>
  )
}

export default App

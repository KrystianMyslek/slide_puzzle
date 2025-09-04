import { useEffect } from 'react'
import Cons from './../Cons';

export default function Set(props) {

    var bsh = props.boardSizeHandle;

    class BoardSize {
        boardXSize;
        boardYSize;
        
        constructor(boardXSize, boardYSize) {
            this.boardXSize = boardXSize
            this.boardYSize = boardYSize
            this.init()
        }

        init() {
            this.disableXButton()
            this.disableYButton()
        }

        setBoardXSize() {
            props.boardSizeHandle.setBoardXSize(this.boardXSize);
            props.boardSizeHandle.setEmptySpace(
                [this.boardXSize-1, this.boardYSize-1]
            );
        }
        
        setBoardYSize() {
            props.boardSizeHandle.setBoardYSize(this.boardYSize);
            props.boardSizeHandle.setEmptySpace(
                [this.boardXSize-1, this.boardYSize-1]
            );
        }

        disableXButton() {
            if (this.boardXSize <= 2) {
                document.getElementById("set_board_x_size_button_minus").disabled = true;
            } else {
                document.getElementById("set_board_x_size_button_minus").disabled = false;
            }
        }

        disableYButton() {
            if (this.boardYSize <= 2) {
                document.getElementById("set_board_y_size_button_minus").disabled = true;
            } else {
                document.getElementById("set_board_y_size_button_minus").disabled = false;
            }
        }

        incrementXSize() {
            this.boardXSize++
            this.setBoardXSize()
            this.disableXButton()
        }

        decrementXSize() {
            this.boardXSize--
            this.setBoardXSize()
            this.disableXButton()
        }

        incrementYSize() {
            this.boardYSize++
            this.setBoardYSize()
            this.disableYButton()
        }

        decrementYSize() {
            this.boardYSize--
            this.setBoardYSize()
            this.disableYButton()
        }
    }

    useEffect(() => {
        window.bs = new BoardSize(bsh.boardXSize, bsh.boardYSize);
    }, []); 

    return (
        <>
            <div className='config'>
                <div>
                    <div className='set_board'>
                        <span>ILOŚĆ WIERSZY</span>
                        <button id="set_board_x_size_button_minus" onClick={() => {
                            bs.decrementXSize()
                        }}>
                            -
                        </button>
                        <span>{bsh.boardXSize}</span>
                        <button id="set_board_x_size_button_plus" onClick={() => {
                            bs.incrementXSize()
                        }}>
                            +
                        </button>
                    </div>
                    <div className='set_board'>
                        <span>ILOŚĆ KOLUMN</span>
                        <button id="set_board_y_size_button_minus" onClick={() => {
                            bs.decrementYSize()
                        }}>
                            -
                        </button>
                        <span>{bsh.boardYSize}</span>
                        <button id="set_board_y_size_button_plus" onClick={() => {
                            bs.incrementYSize()
                        }}>
                            +
                        </button>
                    </div>
                </div>
                <div>
                    <button className="start_game" onClick={() => {
                        bsh.setGameStatus(Cons.GAME_STATUS_ROLL)
                    }}>
                        rozpocznij grę
                    </button>
                </div>
            </div>
        </>
    )
}
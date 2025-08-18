
import Cons from './../Cons';

export default function Set(props) {

    var bsh = props.boardSizeHandle;

    return (
        <>
            <div className='config'>
                <div>
                    <span>ILOŚĆ WIERSZY</span>
                    <button onClick={() => {
                        bsh.setBoardXSize(bsh.boardXSize+1)
                    }}>
                        +
                    </button>
                    <span>{bsh.boardXSize}</span>
                    <button onClick={() => {
                        bsh.setBoardXSize(bsh.boardXSize-1)
                    }}>
                        -
                    </button>
                    <span>ILOŚĆ KOLUMN</span>
                    <button onClick={() => {
                        bsh.setBoardYSize(bsh.boardYSize+1)
                    }}>
                        +
                    </button>
                    <span>{bsh.boardYSize}</span>
                    <button onClick={() => {
                        bsh.setBoardYSize(bsh.boardYSize-1)
                    }}>
                        -
                    </button>
                </div>
                <div>
                    <button className="start_game" onClick={() => {
                        bsh.setGameStatus(Cons.GAME_STATUS_PLAY)
                    }}>
                        START GAME
                    </button>
                </div>
            </div>
        </>
    )
}
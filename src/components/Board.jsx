
import BoardSpace from './BoardSpace';

export default function Board(props) {
  var rows = new Array(props.size.x)
    .fill(0)
    .map((element, x_pos) => {

      return <BoardSpace key={x_pos} size={props.size} x_pos={x_pos} boardHandle={props.boardHandle} />
    })

    return (
      <>
        <table id='board'><tbody>{rows}</tbody></table>
        <div className='game_buttons'>
          <button className='reset_game' onClick={props.reset}>zmień rozmiar</button>
          <button className='reroll_game' onClick={props.reroll}>wymieszaj</button>
        </div>
       </>
    )
}
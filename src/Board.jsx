
import BoardSpace from './BoardSpace';
import Puzzle from './Puzzle';

export default function Board(props) {
  var rows = new Array(props.size.x)
    .fill(0)
    .map((element, x_pos) => {

      return <BoardSpace size={props.size} x_pos={x_pos} emptySpaceHandle={props.emptySpaceHandle} />
    } )

  return <table className='board'><tbody>{rows}</tbody></table>
}
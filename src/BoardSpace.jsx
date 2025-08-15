import Puzzle from './Puzzle';

export default function BoardSpace(props) {

  function checkMovePosibility(x_pos, y_pos) {
    if (props.emptySpaceHandle.emptySpace[0] == x_pos) {
      if (props.emptySpaceHandle.emptySpace[1] == y_pos-1 || props.emptySpaceHandle.emptySpace[1] == y_pos+1) {
        return true;
      }
    }

    if (props.emptySpaceHandle.emptySpace[1] == y_pos) {
      if (props.emptySpaceHandle.emptySpace[0] == x_pos-1 || props.emptySpaceHandle.emptySpace[0] == x_pos+1) {
        return true;
      }
    }

    return false;
  }

  var cols = new Array(props.size.y)
    .fill(0)
    .map((element, y_pos) => {
      var puzzle;

      var empty = (props.emptySpaceHandle.emptySpace[0] == props.x_pos && props.emptySpaceHandle.emptySpace[1] == y_pos) ? true : false;
      var canMovwe = !empty && checkMovePosibility(props.x_pos, y_pos);
      
      if (canMovwe) {
        puzzle = <td onClick={() => {
          props.emptySpaceHandle.func([props.x_pos, y_pos])
        }} >
          <Puzzle empty={empty} movable={true} />
        </td>
      } else {
        puzzle = <td>
          <Puzzle empty={empty} />
        </td>
      }

      return puzzle
    })

  return (
    <tr>{cols}</tr>
  )
}
import Puzzle from './Puzzle';

export default function BoardSpace(props) {

  function checkMovePosibility(x_pos, y_pos) {
    if (props.boardHandle.emptySpace[0] == x_pos) {
      if (props.boardHandle.emptySpace[1] == y_pos-1 || props.boardHandle.emptySpace[1] == y_pos+1) {
        return true;
      }
    }

    if (props.boardHandle.emptySpace[1] == y_pos) {
      if (props.boardHandle.emptySpace[0] == x_pos-1 || props.boardHandle.emptySpace[0] == x_pos+1) {
        return true;
      }
    }

    return false;
  }

  var cols = new Array(props.size.y)
    .fill(0)
    .map((element, y_pos) => {
      var puzzle_num = props.x_pos * props.size.y + y_pos
      var puzzle;

      var empty = (props.boardHandle.emptySpace[0] == props.x_pos && props.boardHandle.emptySpace[1] == y_pos) ? true : false;
      var canMovwe = !empty && checkMovePosibility(props.x_pos, y_pos);
      
      var puzzleInfo = props.boardHandle.puzzlePlaces[puzzle_num];

      if (canMovwe) {
        puzzle = <td onClick={() => {
          var empty_space_pos = props.boardHandle.emptySpace[0] * props.size.y + props.boardHandle.emptySpace[1]
          var newPuzzlePlaces = props.boardHandle.puzzlePlaces.swapItems(empty_space_pos, puzzle_num);

          props.boardHandle.setEmptySpace([props.x_pos, y_pos])
          props.boardHandle.setPuzzlePlaces(newPuzzlePlaces)
        }} >
          <Puzzle empty={empty} movable={true} puzzleInfo={puzzleInfo} />
        </td>
      } else {
        puzzle = <td>
          <Puzzle empty={empty} puzzle={puzzle} puzzleInfo={puzzleInfo} />
        </td>
      }

      return puzzle
    })

  return (
    <tr>{cols}</tr>
  )
}
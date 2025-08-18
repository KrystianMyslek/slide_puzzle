export default function Puzzle(props) {

  var classes = "";

  classes += props.empty ? "empty" : "";
  classes += props.movable ? "movable" : "";
  
  return (
    <div className={classes} >{props.puzzleInfo.value}</div>
  )
}
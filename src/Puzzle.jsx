export default function Puzzle(props) {

// console.log(props.empty);

  var classes = "";

  classes += props.empty ? "empty" : "";
  classes += props.movable ? "movable" : "";
  
  return (
    <div className={classes} >{props.empty}</div>
  )
}
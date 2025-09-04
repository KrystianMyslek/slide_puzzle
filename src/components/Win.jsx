import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Cons from './../Cons';

export default function Set(props) {
    const { width, height } = useWindowSize()

    return (
        <>
            <Confetti width={width} height={height} />
            <div className='win'>
                <span className='congrats'>udało się !</span>
                <span className='score'>wykonane ruchy: {props.movesCount.current}</span>
                <button className='new_game' onClick={props.reset}>zagraj ponownie</button>
            </div>
        </>
    )
}
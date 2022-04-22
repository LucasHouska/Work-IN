import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaxItem from '../MaxItem/MaxItem';

function MaxPage() {

    const dispatch = useDispatch();

    const maxes = useSelector(state => state.exercises.maxReducer)

    console.log(maxes);

    useEffect(() => {
        dispatch({ type: 'GET_MAXES' })
    }, [])

    return (
        <>
            <h1 id='maxes-title'>Maxes</h1>
            <div className='max-list'>
                {maxes.map(max => {
                    return (<MaxItem key={max.id} max={max} />)
                })}
            </div>
        </>
    )
}

export default MaxPage;
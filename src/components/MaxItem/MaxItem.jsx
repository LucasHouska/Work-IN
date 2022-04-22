

function MaxItem({ max }) {

    console.log('max', max)

    return (
        <>
            <div className="max-item">
                <h3>{max.name_of_exercise}</h3>
                <p>{max.weight}</p>
            </div>
        </>
    )
}

export default MaxItem;
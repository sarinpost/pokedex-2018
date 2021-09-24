import React from "react"
import Card from './Card'

const CardRemove = (props) => {
    return (
        <div className="card-container">
            <Card card={props.card} />
            <div className="add-button" onClick={props.onClickRemove.bind(this, props.card)}>
                X
            </div>
        </div>
    )
}

export default CardRemove
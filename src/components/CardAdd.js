import React from "react"
import Card from "./Card"

const CardAdd = (props) => {
    return (
        <div className="card-container">
            <Card card={props.card} />
            <div className="add-button" onClick={props.onClickAdd.bind(this, props.card)}>
                Add
            </div>
        </div>
    )
}

export default CardAdd
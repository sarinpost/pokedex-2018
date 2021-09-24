import React from "react"

const styles = {
    header: {
        fontSize: 30,
    },
    imageCard: {
        height: '100%'
    },
    container_1: {
        display: 'flex',
        width: '100%'
    },
    key: {
        fontSize: 20,
        width: '50%'
    }
}

const Card = ({ card }) => {
    return (
        <div className="card">
            <div style={{ marginRight: '10px' }}>
                <img style={styles.imageCard} src={card.imageUrl} />
            </div>
            <div style={{ width: '50%' }}>
                <div style={styles.header} className="font-header">{card.name}</div>
                <div style={styles.container_1}>
                    <div style={styles.key}>HP:</div>
                    <progress id="file" value={card.hp} max="100"> {card.hp} </progress>
                </div>
                <div style={styles.container_1}>
                    <div style={styles.key}>STR:</div>
                    <progress id="file" value={card.strength} max="100"> {card.strength} </progress>
                </div>
                <div style={styles.container_1}>
                    <div style={styles.key}>WEAK:</div>
                    <progress id="file" value={card.weakness} max="100"> {card.weakness} </progress>
                </div>
                <div>
                    {
                        card.happiness &&
                        [...Array(card.happiness).keys()].map((el, index) =>
                            <img key={index} src={require("./../cute.png")} width="30" style={{ marginRight: 5 }} />
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Card
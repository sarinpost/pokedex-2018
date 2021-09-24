import React, { useEffect, useState } from "react"
import axios from 'axios'
import './../App.css'
import { connect } from 'react-redux'
import Card from './CardAdd'

const Search = (props) => {
    const [cards, setCards] = useState([])
    const [filterdCards, setFilteredCards] = useState([])
    const [searchKey, setSearchKey] = useState('')

    const getData = () => {
        const calStr = (card) => {
            if (card.attacks) {
                let str = card.attacks.length * 50
                return str > 100 ? 100 : str
            } else {
                return 0
            }
        }

        const calWeak = (card) => {
            if (card.weaknesses) {
                let str = card.attacks.length * 100
                return str > 100 ? 100 : str
            } else {
                return 0
            }
        }

        const calDamage = (card) => {
            if (card.attacks) {
                let sum = 0
                card.attacks.forEach(el => {
                    sum += parseInt(el.damage.split(/ /)[0].replace(/[^\d]/g, '') | 0)
                })
                return sum
            } else {
                return 0
            }
        }

        const calHappiness = (hp, damage, { weaknesses = [] }) => {
            const happyLevel = ((hp / 10) + (damage / 10) + 10 - (weaknesses.length)) / 5
            return Math.floor(happyLevel)
        }

        axios.get('http://localhost:3030/api/cards?limit=30')
            .then((response) => {
                let cards = response.data.cards
                let transformed = cards.map(card => {
                    return {
                        ...card,
                        hp: card.hp > 100 ? 100 : card.hp,
                        strength: calStr(card),
                        weakness: calWeak(card),
                        damage: calDamage(card),
                        happiness: calHappiness(calStr(card), calDamage(card), card)
                    }
                })
                let temp = transformed
                props.cards.forEach((card) => {
                    temp = temp.filter(el => el.id !== card.id)
                })
                setCards(temp)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (props.modal) {
            setSearchKey('')
            getData()
        }
    }, [props.modal])

    useEffect(() => {
        setFilteredCards(cards)
    }, [cards])

    useEffect(() => {
    }, [filterdCards])

    useEffect(() => {
        let filtered = filterdCards.filter(card => !props.cards.includes(card))
        setFilteredCards(filtered)
    }, [props.cards])

    const onSearch = (e) => {
        let searhKey = e.target.value
        setSearchKey(e.target.value)
        let result = cards.filter(card => card.name.toLowerCase().includes(searhKey.toLowerCase()))
        setFilteredCards(result)
        document.querySelector("#card-list-modal").scrollTop = 0;
    }

    const onAdd = (el) => {
        props.dispatch({ type: 'ADD_CARD', card: el })
    }

    return (
        <div className="search-container">
            <div className="input-container">
                <input id="input" type="text" placeholder="find pokemon" value={searchKey} onChange={onSearch} />
                <img className="img-search-icon" src={require('./../search.png')} />
            </div>
            <div id="card-list-modal" className="card-list-modal">
                {filterdCards && filterdCards.map(card => (
                    <Card key={card.id} card={card} onClickAdd={onAdd} />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps)(Search)
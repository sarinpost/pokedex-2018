import React, { useEffect, useState, useRef } from 'react'
import './../App.css'
import Search from './Search';
import { connect } from 'react-redux'
import Card from './CardRemove'

const COLORS = {
    Psychic: "#f8a5c2",
    Fighting: "#f0932b",
    Fairy: "#c44569",
    Normal: "#f6e58d",
    Grass: "#badc58",
    Metal: "#95afc0",
    Water: "#3dc1d3",
    Lightning: "#f9ca24",
    Darkness: "#574b90",
    Colorless: "#FFF",
    Fire: "#eb4d4b",
    Theme: '#E44845'
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '50%'
    },
}

const MyPokedex = (props) => {
    const [cards, setCards] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setCards(props.cards)
    }, [props.cards])

    const onClickAdd = () => {
        setModal(true)
    }

    const onRemove = (card) => {
        props.dispatch({ type: 'REMOVE_CARD', card })
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setModal(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div>
            <div className="App">
                <h1 style={{ textAlign: 'center' }}>My Pokedex</h1>
                {
                    cards.length > 0 && <div className="my-pokedex-card-list">
                        {
                            cards.map(card =>
                                <div key={card.id} className="my-pokedex-card-container">
                                    <div style={{ padding: 10 }}>
                                        <Card card={card} onClickRemove={onRemove} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                {cards.length === 0 && <div style={{ textAlign: 'center', color: 'grey' }}>no pokemon cards ...</div>}
                <div className="nav-bottom-container">
                    <div className="nav-bottom">
                        <div
                            className="button-add-card"
                            onClick={onClickAdd}
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: modal ? 'block' : 'none', opacity: modal ? '50%' : '100%', backgroundColor: 'black', position: 'absolute', top: 0, width: "100%", height: '100%' }} />
            <div
                ref={wrapperRef}
                style={{ display: modal ? 'block' : 'none', position: 'absolute', width: "90%", left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '15px' }}
            >
                <Search modal={modal}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps)(MyPokedex)

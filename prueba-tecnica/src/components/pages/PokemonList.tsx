import React, { Component } from 'react'
import axios from 'axios';
import { Row, Card, Button } from 'react-bootstrap';
import '../../css/style.css';
import { environment } from '../../environment/environment';

const pokemonURL = environment.pokeApiURL;

export class PokemonList extends Component {

    state = {
        pokemon: {
            abilities: [],
            base_experience: '',
            forms: [],
            game_indices: [],
            height: '',
            held_items: [],
            id: '',
            is_default: '',
            location_area_encounters: '',
            moves: [],
            name: '',
            order: '',
            past_types: [],
            species: [],
            sprites: {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: '',
            },
            stats: [],
            weight: '',
        },
        status: false
    }


    getPokemon = (pokemonId: number) => {
        let pokeId = pokemonId;
        axios.get(pokemonURL + pokeId)
            .then(response => {
                this.setState({
                    pokemon: response.data,
                    status: true
                })

            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount = () => {
        this.getPokemon(1);
    }

    getNewPokemon = () => {
        let randomId = Math.floor(Math.random() * 21) + 1;
        this.getPokemon(randomId);
        this.setState({
            pokemon: [],
            status: false
        })
    }

    render() {
        
        return (
            <div className="container">
                <div className='col text-center'>
                    <button className='btn btn-success m-2' onClick={this.getNewPokemon}>Obtener Nuevo Pokemon</button>
                </div>
                <div className='text-center mt-2 justify-content-center d-flex'>
                    {
                        this.state.status === false &&
                        (
                            <h1>Cargando...</h1>
                        )
                    }
                    {this.state.status === true &&
                        (
                            <div className="card">
                                <Row className="">
                                    <Card className='shadow' style={{ width: '30rem' }}>
                                        <Card.Body style={{ textAlign: 'left' }}>
                                            <Card.Title className='text-center'>Información de {this.state.pokemon.name.toUpperCase()}</Card.Title>
                                            <img src={this.state.pokemon.sprites.back_default} alt=""  style={{ width: '5em' }} />

                                            <p><strong>Nombre:</strong> {this.state.pokemon.name}</p>
                                            <p><strong>Experiencia:</strong> {this.state.pokemon.base_experience}</p>
                                            <p><strong>ID:</strong> {this.state.pokemon.id}</p>
                                            <p><strong>Altura:</strong> {this.state.pokemon.height}</p>
                                            <p><strong>Peso:</strong> {this.state.pokemon.weight}</p>
                                            
                                            <p><strong>Habilidades:</strong></p>
                                            
                                            
                                            <ul>
                                                {this.state.pokemon.abilities.map((a, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <p>{a['ability']['name']}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            
                                            <div className='row'>
                                                <div className='col-sm-12 col-lg-6'>
                                                    <p><strong>Indice de juego:</strong></p>
                                                    <ul>
                                                        {this.state.pokemon.game_indices.map((a, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    <p>{a['game_index']} - {a['version']['name']}</p>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className='col-sm-12 col-lg-6'>
                                                    <p><strong>Estadísticas:</strong><br />(Nombre - base - esfuerzo) </p>
                                                    <ul>
                                                        {this.state.pokemon.stats.map((a, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    <p>{a['stat']['name']} - {a['base_stat']} - {a['effort']}</p>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <p><strong>Movimientos:</strong></p>
                                            <ul>
                                                {this.state.pokemon.moves.map((a, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <p>{a['move']['name']}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default PokemonList
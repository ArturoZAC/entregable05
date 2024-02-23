import React, { useEffect} from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import "./styles/pokeCard.css"

const PokeCard = ({url}) => {

    const [pokemon, getPokemon] = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        getPokemon(url); 
    }, [url, getPokemon]);

    const handleClick = () => {
        if (pokemon) { 
            navigate(`/pokedex/${pokemon.id}`);
        }
    };

    //console.log(pokemon)
    
  return (
    <>
    {pokemon?.sprites.other["official-artwork"].front_default &&(
        <article onClick={handleClick} className={`${pokemon?.types[0]?.type?.name} poke__card`}>
            {pokemon?.sprites.other["official-artwork"].front_default && (
                <div className={`${pokemon?.types[0]?.type?.name} poke__div`}></div>
            )}

            {pokemon?.sprites.other["official-artwork"].front_default && (
                <figure className='poke__figure'>
                    <img 
                        src={pokemon?.sprites.other["official-artwork"].front_default} 
                        alt="photopokemon" 
                    />
                </figure>
            )}
            {pokemon?.sprites.other["official-artwork"].front_default && (
                <div className='div__global'>
                    <h3 className={`${pokemon?.types[0]?.type?.name} poke__h3`}>{pokemon?.name}</h3>
                    <ul className='poke__types'>
                    {pokemon?.types?.map(type => (
                        <li key={type.type.url} className={`slot${type.slot}`}>
                            {type.type.name}
                        </li>
                    ))}
                    </ul>
                </div>
            )}
            {pokemon?.sprites.other["official-artwork"].front_default && (
                <>
                    <p className='plomo'>Type</p>
                    <hr />
                </>
            )}

            {pokemon?.sprites.other["official-artwork"].front_default &&(
            <ul className='poke__stats'>
            {
                pokemon?.stats.map(stat => (
                    !stat.stat.name.includes("special") &&
                    <li className='plomo' key={stat.stat.url}>
                        {stat.stat.name}
                        <span className={`${pokemon?.types[0]?.type?.name} poke__span`}>{stat.base_stat}</span>
                    </li>
                ))
            }                        
            </ul>
            )}      
        </article>
    )}
    </>
    )
}

export default PokeCard
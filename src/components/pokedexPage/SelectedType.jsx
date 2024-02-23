import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../../store/slices/pokemonName.slice';
import "./styles/selectedType.css"

const SelectedType = ({setSelectValue, setCurrentPage,textinput}) => {

    const [types, getTypes] = useFetch();
    const pokemonName = useSelector(store => store.pokemonName);
    const disp = useDispatch()

    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/type"
        getTypes(url)
    }, [])
    
    const textSelect = useRef()

    const handleChange = () => {
        setSelectValue(textSelect.current.value)
        setCurrentPage(1)
        disp(setPokemonName(""))
    }

  return (
    <select className='container__select' onChange={handleChange} ref={textSelect}>
        <option value="allPokemons">allPokemons</option>
        {
            types?.results.map(type => (
                <option key={type.url} value={type.url}>{type.name}</option>
            ))
        }
    </select>
  )
}

export default SelectedType
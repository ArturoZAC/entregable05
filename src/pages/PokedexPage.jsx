import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectedType from '../components/pokedexPage/SelectedType';
import Pagination from '../components/pokedexPage/Pagination';
import "./styles/pokedexPage.css"

const PokedexPage = () => {
  const [selectValue, setSelectValue] = useState('allPokemons');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const trainerName = useSelector(store => store.trainerName);
  const pokemonName = useSelector(store => store.pokemonName);
  const textinput = useRef();
  const dispatch = useDispatch();
  const [pokemones, getPokemones, gePerType] = useFetch();
  const [showPagination, setShowPagination] = useState(true); 
  const [activeCategory, setActiveCategory] = useState('allPokemons'); // Definimos activeCategory aquí

  useEffect(() => {
    if (selectValue !== 'allPokemons') {
      setCurrentPage(1);
    }
  }, [selectValue]);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${(currentPage - 1) * 30}`;
      getPokemones(url);
    } else {
      gePerType(selectValue);
    }
  }, [selectValue, currentPage]);


  useEffect(() => {
    //console.log("Total de pokemones recibidos:", pokemones);
    if (pokemones) {
        const totalResults = pokemones?.count || pokemones?.results?.length || 0;
        const totalPages = Math.ceil(totalResults / 30);
        //console.log("Total de páginas:", totalPages);
        setTotalPage(totalPages);
        setShowPagination(!pokemonName);
    }
  }, [pokemones, pokemonName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = textinput.current.value.trim().toLowerCase();
    dispatch(setPokemonName(searchValue));
    //console.log("Searched Pokemon name:", searchValue);
    textinput.current.value = '';
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const cbfilter = () => {
    if (pokemonName) {
      return pokemones?.results.filter(e => e.name.includes(pokemonName));
    } else {
      return pokemones?.results;
    }
  }


  const searchAllPokemons = () => {
    const filteredPokemons = pokemonName ? pokemones?.results.filter(poke => poke.name.includes(pokemonName)) : pokemones?.results || [];
    return filteredPokemons.map(poke => (
      <PokeCard key={poke.url} url={poke.url} />
    ));
  };

  const renderAllPokemonsPageByPage = () => {
    return pokemones?.results?.map(poke => (
      <PokeCard key={poke.url} url={poke.url} />
    ));
  };

  const renderCategoryPokemons = () => {
    const filteredCategoryPokemons = cbfilter() || []; 
    const startIndex = (currentPage - 1) * 30;
    const endIndex = currentPage * 30;
    const categoryPokemonsForPage = filteredCategoryPokemons.slice(startIndex, endIndex);
    return categoryPokemonsForPage.map(poke => (
      <PokeCard key={poke.url} url={poke.url} />
    ));
  };


  //console.log("Name de pokemonName: " + pokemonName)
  //console.log(selectValue)


  useEffect(() => {
    //console.log("pokemonName actualizado:", pokemonName);
    //console.log("pokemones actualizado:", pokemones);
  }, [pokemonName, pokemones]);



  return (
    <div className='pokedex'>
      <section className='poke__header'>
        <h3 className='title'>
          <span>Bienvenido {trainerName}, </span>
          Aquí podrás encontrar tu Pokémon favorito
        </h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input className='input_poke' type="text" ref={textinput}/>
            <button className='input_pokee'>Buscar</button>
          </form>
          <SelectedType 
            setSelectValue={setSelectValue}
            setCurrentPage={setCurrentPage} 
            textinput = {textinput}
          />
        </div>
      </section>
      <section className='poke__container'>
      {
        selectValue === 'allPokemons' ? (
          pokemonName ? searchAllPokemons() : renderAllPokemonsPageByPage()
        ) : (
          renderCategoryPokemons()
        )
      }
      </section>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default PokedexPage;

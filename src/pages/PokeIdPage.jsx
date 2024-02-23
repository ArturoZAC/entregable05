import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import "./styles/pokedexIdPage.css"

const PokeIdPage = () => {

  const [pokeData, getPokeData] = useFetch()
  const param = useParams()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`
    getPokeData(url)
  }, [])
  
  console.log(pokeData)

  const maxValue = 150; // Valor máximo permitido
  const currentValue = pokeData?.stats[5]?.base_stat || 0; // Valor actual
  const percentage = Math.min((currentValue / maxValue) * 100, 100); // Calcula el porcentaje, asegurándose de que no sea más de 100
  

  return (
    <div className='gen_gen'>
      <div className='container_gen'>
        <div className='container_img'>
          <div className={`${pokeData?.types[0]?.type?.name} poke__img`}></div>
          <figure className='figure'>
            <img src={pokeData?.sprites.other["official-artwork"].front_default} alt="photopokemon" />
          </figure>
        </div>
        <h3 className={`${pokeData?.types[0]?.type?.name} text-id`}>#{pokeData?.id}</h3>
        <div className='container_line'>
          <div className='line'></div>
          <h3 className={`${pokeData?.types[0]?.type?.name} name`}>{pokeData?.name}</h3>
          <div className='line'></div>
        </div>
        <div className='info_poke'>
          <div className='container_info'>
            <p className='color_p'>Peso</p>
            <p className='color_p'>{pokeData?.weight}</p>
          </div>
          <div className='container_info'>
            <p className='color_p'>Altura</p>
            <p className='color_p'>{pokeData?.height}</p>
          </div>
        </div>
        <div className='container__skills'>
          <div>
            <p className='p__type'>Tipo</p>
            <div className='type__off'>
              <div className={`${pokeData?.types[0]?.type?.name} t__type`}>{pokeData?.types[0]?.type.name}</div>
              {pokeData?.types[1]?.type.name && (
                <>
                <div className={`${pokeData?.types[1]?.type?.name} t__type`}>{pokeData?.types[1]?.type.name}</div>
                </>
              )
              }
            </div>
          </div>
          <div>
            <p className='p__type'>Habilidades</p>
            <div className='type__off'>
              <div className='t__typesk'>{pokeData?.abilities[0]?.ability.name}</div>
              {pokeData?.abilities[1]?.ability.name && (
                <>
                <div className='t__typesk'>{pokeData?.abilities[1]?.ability.name}</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='ddd'>
          <div className='container_stat'>
            <p className='p_stat_of'>Stats</p>
            <div className='line_stat'></div>
          </div>

          <div>
            <div className='stat_gen'>
              <p className='stat_p'>HP:</p>
              <p className='stat_p'>{pokeData?.stats[0]?.base_stat}/150</p>
            </div>
            <div className='stat__line_of'>
              <div className='line_tt' style={{ width: `${pokeData?.stats[0]?.base_stat}%` }}></div>
            </div>
          </div> 

          <div>
            <div className='stat_gen'>
              <p className='stat_p'>ATAQUE:</p>
              <p className='stat_p'>{pokeData?.stats[1]?.base_stat}/150</p>
            </div>
            <div className='stat__line_of'>
              <div className='line_tt' style={{ width: `${pokeData?.stats[1]?.base_stat}%` }}></div>
            </div>
          </div> 

          <div>
            <div className='stat_gen'>
              <p className='stat_p'>DEFENSA:</p>
              <p className='stat_p'>{pokeData?.stats[2]?.base_stat}/150</p>
            </div>
            <div className='stat__line_of'>
              <div className='line_tt' style={{ width: `${pokeData?.stats[2]?.base_stat}%` }}></div>
            </div>
          </div> 

          <div>
            <div className='stat_gen'>
              <p className='stat_p'>VELOCIDAD:</p>
              <p className='stat_p'>{pokeData?.stats[5]?.base_stat}/150</p>
            </div>
            <div className='stat__line_of'>
              <div className='line_tt' style={{ width: `${percentage}%` }}></div>
            </div>
          </div> 
        </div>  
      </div>

      <div className='container__mov'>
          <div className='container_statt'>
            <p className='p_stat_of'>Movements</p>
            <div className='line_stat'></div>
          </div>
          <ul className='list_mov'>
            {
              pokeData?.moves?.slice(0, 20).map(mov => (
                <li key={mov?.move?.url} className='li_stat'>{mov?.move?.name}</li>
              ))
            }
          </ul>
      </div>          


    </div>
  )
}

export default PokeIdPage
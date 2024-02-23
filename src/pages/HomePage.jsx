import React, { useRef } from 'react'
import { useDispatch} from 'react-redux'
import { setTrainerName } from '../store/slices/trainerName.slice'
import { useNavigate } from 'react-router-dom'
import "./styles/homePage.css"

const HomePage = () => {

  const disp = useDispatch()
  const textinput = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    disp(setTrainerName(textinput.current.value.trim()))
    navigate('/pokedex')
  }

  // console.log(trainerName)

  return (
    <div className='container'>
      <h1 className='h1_home'>!Hola entrenador!</h1>
      <h2 className='h2_home'>Para poder comenzar, dame tu nombre</h2>
      <form onSubmit={handleSubmit}>
        <input className='input_home' placeholder='Tu nombre...' type="text" ref={textinput}/>
        <button>Comenzar</button>
      </form>
    </div>
  )
}

export default HomePage
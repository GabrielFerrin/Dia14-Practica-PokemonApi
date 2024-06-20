import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/userForm"

// eslint-disable-next-line react/prop-types
const PokemonProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [allPokemons, setAllPokemons] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: ''
  })
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState(false)
  // get all Pokemons
  const getAllPokemons = async (limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const rawRes = await fetch(url)
    const res = await rawRes.json()
    const promises = res.results.map(async (pokemon) => {
      return await fetch(pokemon.url).then((res) => res.json())
    })
    setAllPokemons([...allPokemons, await Promise.all(promises)])
    setOffset(offset + 50)
    setLoading(false)
  }
  useEffect(() => {
    getAllPokemons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // get global Pokemons
  const getGlobalPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    const rawRes = await fetch(url)
    const res = await rawRes.json()
    console.log(res)
    const promises = res.results.map(async (pokemon) => {
      return await fetch(pokemon.url).then((res) => res.json())
    })
    setGlobalPokemons(await Promise.all(promises))
    setLoading(false)
  }
  useEffect(() => {
    getGlobalPokemons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // get pokemon by id
  // eslint-disable-next-line no-unused-vars
  const getPokemonById = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return await fetch(url).then((res) => res.json())
  }
  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonById
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider

import './App.css'
import AppRouter from './AppRouter'

import { PokemonProvider } from './context/PokemonProvider'

const App = () => (
  <PokemonProvider >
    <AppRouter />
  </PokemonProvider>
)

export default App


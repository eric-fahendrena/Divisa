import { useState } from 'react'
import Header from './components/Header.jsx'
import Exchange from './components/Exchange.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Exchange />
    </>
  )
}

export default App

import { useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header.jsx'
import Exchange from './components/Exchange.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Helmet>
        <title>Divisa Exchange</title>
        <meta name='description' content='Obtenez les taux de change en temps réel pour toutes vos conversions de devises.' />
        <meta name='keywords' content='Divisa Exchange, Conversion de devises en ligne, Taux de change en temps réel, Convertisseur de monnaies, Calculateur de change, Convertisseur EUR en USD, Outil de conversion de devises' />
        <meta property='og:title' content='Divisa Exchange - Convertisseur de devises' />
        <meta property='og:description' content='Divisa Exchange vous permet de convertir instantanément vos devises avec les taux les plus récents.' />
      </Helmet>
      <Header />
      <Exchange />
    </>
  )
}

export default App

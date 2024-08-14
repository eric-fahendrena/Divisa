import { createContext, useState, useEffect } from "react";
import { fetchAmounts } from '../services/api.js'

export const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [currencyRates, setCurrencyRates] = useState({})

  useEffect(() => {
    fetchAmounts('USD').then((data) => {
      setCurrencyRates(data)
    })
  }, [])

  return (
    <CurrencyContext.Provider value={{ currencyRates }}>
      { children }
    </CurrencyContext.Provider>
  )
}

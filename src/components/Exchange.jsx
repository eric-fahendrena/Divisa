import { useState, useContext, useEffect } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { Container, Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import AOS from 'aos'

const Exchange = () => {
  const { currencyRates } = useContext(CurrencyContext)
  const [currentCurrency, setCurrentCurrency] = useState('USD')
  const [currentAmount, setCurrentAmount] = useState(0)
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [targetAmount, setTargetAmount] = useState(0)
  const inputCurrencyHeight = 128
  const calcTargetAmount = (input) => {
    const result = (input / currencyRates.conversion_rates[currentCurrency]) * currencyRates.conversion_rates[targetCurrency]

    setCurrentAmount(input)  
    setTargetAmount(result)
  }

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])

  return (
    <>
      <section 
        style={{ 
          height: window.innerHeight,
          background: 'linear-gradient(0deg, rgba(34,34,195,1) 0%, rgba(14,106,231,1) 31%, rgba(0,112,255,1) 52%, rgba(177,45,253,1) 100%)'
        }} 
        className='d-flex align-items-center justify-content-center'>
        <Container>
          <Form className='w-75'>
            <Row>
              <Col md={6}>
                <div data-aos='fade-up'>
                  <Form.Group className='mb-3'>
                    <Form.Select 
                      className='w-25 fw-bold' 
                      onChange={(e) => {
                        setCurrentCurrency(e.target.value)
                        calcTargetAmount(currentAmount)
                      }}>
                      <option value="USD" disabled={ targetCurrency === 'USD' }>USD</option>
                      <option value="EUR" disabled={ targetCurrency === 'EUR' }>EUR</option>
                      <option value="GBP" disabled={ targetCurrency === 'GBP' }>GBP</option>
                      <option value="JPY" disabled={ targetCurrency === 'JPY' }>JPY</option>
                      <option value="AUD" disabled={ targetCurrency === 'AUD' }>AUD</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <FloatingLabel 
                      controlId='amountInput'
                      label={ `Montant en ${currentCurrency}` }
                      className='mb-3' >
                      <Form.Control 
                        type='number' 
                        placeholder='Entrez le montant' 
                        className='fs-1' 
                        style={{ height: inputCurrencyHeight }}
                        onChange={ (e) => calcTargetAmount(e.target.value) } />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div data-aos='fade-up'>
                  <Form.Group className='mb-3'>
                    <Form.Select 
                      className='w-25 fw-bold' 
                      defaultValue={'EUR'} 
                      onChange={(e) => {
                        console.log('Vous avec selectionné', e.target.value)
                        setTargetCurrency(e.target.value)
                        setCurrentAmount(currentAmount)
                        calcTargetAmount(currentAmount)
                      }}>
                      <option value="USD" disabled={ currentCurrency === 'USD' }>USD</option>
                      <option value="EUR" disabled={ currentCurrency === 'EUR' }>EUR</option>
                      <option value="GBP" disabled={ currentCurrency === 'GBP' }>GBP</option>
                      <option value="JPY" disabled={ currentCurrency === 'JPY' }>JPY</option>
                      <option value="AUD" disabled={ currentCurrency === 'AUD' }>AUD</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <FloatingLabel 
                      controlId='amountInput'
                      label={ `Montant en ${targetCurrency}` }
                      className='mb-3'>
                      <Form.Control 
                        type='text' 
                        value={ targetAmount }
                        className='fs-1' 
                        style={{ height: inputCurrencyHeight }}
                        readOnly />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </>
  )
}

export default Exchange

import { useState, useContext, useEffect } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { Container, Row, Col } from 'react-bootstrap'
import { Dropdown, DropdownButton } from 'react-bootstrap'
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
    // setTargetAmount(result)
    return result
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
                  <DropdownButton 
                      variant='light'
                      title={currentCurrency} 
                      onSelect={(eventKey) => {
                        setCurrentCurrency(eventKey)
                        console.log('before', targetAmount)
                        const newTargetAmount = calcTargetAmount(currentAmount)
                        console.log('after', newTargetAmount)
                      }}
                    >
                      <div
                        className='overflow-y-scroll'
                        style={{
                          maxHeight: 160
                        }}
                      >
                        {currencyRates.conversion_rates != null ? (
                          Object.keys(currencyRates.conversion_rates).map((currency, index) => {
                            return (
                              <Dropdown.Item 
                                eventKey={currency}
                                disabled={ targetCurrency === currency } 
                                key={index}
                              >
                                {currency}
                              </Dropdown.Item> 
                            ) 
                          })
                          ) : <Dropdown.Item>Chargement...</Dropdown.Item>}
                      </div>
                    </DropdownButton>
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
                        onChange={ (e) => setTargetAmount(calcTargetAmount(e.target.value)) } />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div data-aos='fade-up'>
                  <Form.Group className='mb-3'>
                    <DropdownButton 
                      variant='light'
                      title={targetCurrency} 
                      onSelect={(eventKey) => {
                        setTargetCurrency(eventKey)
                        console.log('before', targetAmount)
                        const newTargetAmount = calcTargetAmount(currentAmount)
                        console.log('after', newTargetAmount)
                      }}
                    >
                      <div
                        className='overflow-y-scroll'
                        style={{
                          maxHeight: 160
                        }}
                      >
                        {currencyRates.conversion_rates != null ? (
                          Object.keys(currencyRates.conversion_rates).map((currency, index) => {
                            return (
                              <Dropdown.Item 
                                eventKey={currency}
                                disabled={ currentCurrency === currency } 
                                key={index}
                              >
                                {currency}
                              </Dropdown.Item> 
                            ) 
                          })
                          ) : <Dropdown.Item>Chargement...</Dropdown.Item>}
                      </div>
                    </DropdownButton>
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
        <div className='fixed-bottom ps-5'>
          <p className='pt-5 small text-light'>© 2024 J. Eric Razanapahendrena.</p>
        </div>
      </section>
    </>
  )
}

export default Exchange

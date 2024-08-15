import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap'

const Header = () => {
    return (
        <>
            <header className='fixed-top'>
                <Navbar variant='dark' className=''>
                    <Container>
                        <Navbar.Brand href='/'><span className='fs-3'>Divisa Exchange</span></Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header

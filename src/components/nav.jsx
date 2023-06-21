import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';

function BarraNavegacion() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>MyDataSinc</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className="link-menu" to="/">Inicio</NavLink>
                        <NavLink className="link-menu" to="/crear">Agregar</NavLink>
                        <NavLink className="link-menu" to="/mercado">Mercado Libre</NavLink>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export { BarraNavegacion };
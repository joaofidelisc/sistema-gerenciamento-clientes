import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice.js';
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
      
  const handleLogout = () =>{
      dispatch(logoutUser());
      navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/restrito">Gerencia Clientes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/restrito">Cadastro de clientes</Nav.Link>
            <Nav.Link href="/restrito/consulta-cliente">
              Consulta de clientes
            </Nav.Link>
            <Nav.Link href="/restrito/consulta-colaborador">
              Consulta de colaborador
            </Nav.Link>
            <Nav.Link onClick={handleLogout} href="/">
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

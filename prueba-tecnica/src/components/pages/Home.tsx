import React, { Component } from 'react'
import { Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import PokemonList from './PokemonList';

const cookies = new Cookies();
let fullName: string;

export default class Home extends Component {

    logOut = () => {
        cookies.remove('id', { path: '/' });
        cookies.remove('email', { path: '/' });
        cookies.remove('name', { path: '/' });
        cookies.remove('lastname', { path: '/' });
        window.location.href = "./";
    }

    componentDidMount(): void {
        if (!cookies.get('email')) {
            window.location.href = './'
        }
    }

    render() {
        fullName = cookies.get('name') + ' ' + cookies.get('lastname');
        return (
            <div>
                <div>
                    <Navbar variant="dark" bg="dark" expand="lg">
                        <Container>
                            <Navbar.Brand>Bienvenido, {fullName}</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text><a href="#" onClick={this.logOut}>Cerrar Sesión</a></Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <PokemonList></PokemonList>
            </div>
        )
    }
}

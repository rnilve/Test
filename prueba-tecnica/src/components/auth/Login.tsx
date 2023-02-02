import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { Button, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { environment } from '../../environment/environment';

const baseURL = environment.baseURL;
const cookies = new Cookies();

export class Login extends Component {

  state = {
    form: {
      email: '',
      password: ''
    }
  }

  handleChange = async (e: any) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  login = async() =>{
    await axios.get(baseURL, { params: { email: this.state.form.email, password: md5(this.state.form.password)}})
      .then(response => {
        return response.data;
      })
      .then(response => {
        if(response.length>0){
          var response = response[0];
          cookies.set('id', response.id, {path:'/'});
          cookies.set('email', response.email, {path:'/'});
          cookies.set('name', response.name, {path:'/'});
          cookies.set('lastname', response.lastname, {path:'/'});
          window.location.href="./home";
        }else{
          alert('Credenciales incorrectas')
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }

  componentDidMount(): void {
    if(cookies.get('email')){
      window.location.href='./home'
    }
  }


  render() {
    return (
      <div className="justify-content-center d-flex align-items-center" style={{ backgroundColor: '#fff', height: '100vh' }}>
        <Row className="">
          <Card className='shadow' style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title className='text-center py-2 font-weight-bold'>Inicio de sesión</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="text" name='email' onChange={this.handleChange} placeholder="Correo electrónico" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name='password' onChange={this.handleChange} placeholder="Password" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" onClick={()=> this.login()}>
                    Iniciar sesión
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </div>
    )
  }
}

export default Login
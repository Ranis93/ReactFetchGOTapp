import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage} from '../pages';
import GotService from '../../services/gotService';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModule : true,
            error: false
        }
    }

    gotService = new GotService();

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onShowHide() {
        const {showModule} =this.state;
        this.setState({
            showModule: !showModule
        })
    }

    render() {
        const {showModule} =this.state;
        let module1;
        if (showModule) {
            module1 = <RandomChar/>
        } else {
            module1 = false;
        }

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {module1}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    key='bt1'
                                    type='button'
                                    color="primary"
                                    onClick={() => this.onShowHide()}
                                >Show/Hide Random Character
                                </Button>
                            </Col>
                        </Row>
                        <Routes>                 
                        <Route path='/characters' element={<CharacterPage/>}/>                        
                        <Route path='/houses' element={<HousesPage/>}/>
                        <Route path='/books' element={<BooksPage/>}/>
                        </Routes>
                    </Container>
                </div>
            </Router>
        );
    }
    
}
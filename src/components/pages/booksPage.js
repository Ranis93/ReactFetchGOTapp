import React, { Component } from "react";
import ItemList from '../itemList';
import {ItemDetails, Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import GotService from '../../services/gotService';
import RowBlock from "../rowBlock/rowBlock";

class BooksPage extends Component {
    gotService = new GotService();
    state = {
        selectedBook: 3,
        error: false
    }

    static defaultProps = {
        flag: 'book'
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllBooks}
            renderItem={({name, numberOfPages}) => `${name} (Number of pages: ${numberOfPages})`}/>
        )

        const itemDetails = (
            <ItemDetails 
            itemId={this.state.selectedBook}
            flag={this.props.flag}>
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='country' label='Country'/>
                <Field field='released' label='Released'/>
                <Field field='authors' label='Authors'/>
            </ItemDetails>
        )

        return(
            <RowBlock 
            left={itemList} 
            right={itemDetails}/>
        )
    }
}

export {BooksPage};
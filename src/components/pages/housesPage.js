import React, { Component } from "react";
import ItemList from '../itemList';
import {ItemDetails, Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import GotService from '../../services/gotService';
import RowBlock from "../rowBlock/rowBlock";

class HousesPage extends Component {
    gotService = new GotService();
    
    state = {
        selectedHouse: 1,
        error: false
    }

    static defaultProps = {
        flag: 'house'
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                getData={this.gotService.getAllHouses}
                renderItem={({ name, region }) => `${name} (Region: ${region})`} />
        )

        const itemDetails = (
            <ItemDetails 
            itemId={this.state.selectedHouse}
            flag={this.props.flag}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='id' label='Number of house'/>
            </ItemDetails>
        )

        return(
            <RowBlock 
            left={itemList} 
            right={itemDetails}/>
        )
    }
}

export {HousesPage};
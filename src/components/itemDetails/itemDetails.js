import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item : null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }                                                           // условие обязательно

    updateItem() {
        const { itemId, flag } = this.props;
        if (!itemId) {
            return;
        } else if (flag === 'character') {
            this.gotService.getCharacter(itemId)
                .then((item) => {
                    this.setState({ item })
                })
        } else if (flag === 'book') {
            this.gotService.getBook(itemId)
                .then((item) => {
                    this.setState({ item })
                })
        } else if (flag === 'house') {
            this.gotService.getHouse(itemId)
                .then((item) => {
                    this.setState({ item })
                })
        }

    }

    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select item</span>
        }

        const{item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {ItemDetails};
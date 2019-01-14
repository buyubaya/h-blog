import React from 'react';
import firebase from 'firebase';
import moment from 'moment';

class MoneyStats extends React.Component {
    constructor(){
        super();

        this.state = {
            items: null
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillMount(){
        this.moniesRef = firebase.database().ref('monies');
        this.moneyCategoriesRef = firebase.database().ref('moneyCategories');

        if(this.moniesRef){
            this.moniesRef.on('value', snap => {
                let items = [];
                snap.forEach(item => {
                    let moneyCategory = item.child('moneyCategoryId').val();
                    
                    if(moneyCategory){
                        this.moneyCategoriesRef.child(moneyCategory).on('value', snapCate => {
                            moneyCategory = snapCate.child('name').val();
                        });
                        
                        items.push({id: item.key, ...item.val(), moneyCategory});
                    }
                });
                this.setState({items});
            });
        }
    }

    handleRemove(item){
        this.moniesRef.child(item.id).remove();
    }

    render(){
        const {items} = this.state;

        return(
            (items && items.length > 0)
            ?
            <div className='table-area'>
                <table className='table table-striped money-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                            <th>Money Type</th>
                            <th>Reason</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item =>
                                <tr key={item.id}>
                                    <td>{moment(item.created).format('DD/MM/YYYY')}</td>
                                    <td>{item.value}</td>
                                    <td>{(item.moneyType === 1) ? 'Money in' : 'Money out'}</td>
                                    <td>{item.moneyCategory}</td>
                                    <td>
                                        <span className='fa fa-times' onClick={e => this.handleRemove(item)}></span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            :
            null
        );
    }
}

export default MoneyStats;
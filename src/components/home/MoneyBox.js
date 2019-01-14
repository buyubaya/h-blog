import React from 'react';
import { compose } from 'redux';
import { ref, getData } from '../../libs/firebase';
import { Query, Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { get as _get, map as _map } from 'lodash';

// COMPONENTS
import MegaSelect from './MegaSelect';
import MoneyStats from './MoneyStats';
import ApolloQuery from '../HOCs/ApolloQuery';
import ApolloMutation from '../HOCs/ApolloMutation';
import {app} from '../../libs/firebase';

const userId = 'WNSd8A8IKnOKWmfw3yJlipKgcJE3';

class MoneyBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			selectedOption: null,
			total: null,
			editingOption: null
		};

		this.selectOption = this.selectOption.bind(this);
		this.addOptions = this.addOptions.bind(this);
		this.removeOptions = this.removeOptions.bind(this);
		this.updateOption = this.updateOption.bind(this);
		this.addMoney = this.addMoney.bind(this);
	}
    
    componentDidMount(){
        // app.auth().createUserWithEmailAndPassword('name@email.com', 'password').catch(err => console.log(err));
    }

    componentWillReceiveProps(props){
        if(!props.data.loading){
            let items = props.data.moneyCategories;
            items = _map(items, item => ({value: item.id, label: item.name}));
            this.setState({items});
        }
        // getData('monies').then(data => {
        //     const total = data.reduce((result, current) => Number(result + current.value), 0);
        //     this.setState({total});
        // });
    }

	selectOption(item){
		this.setState({selectedOption: item});
	}

	addOptions(value){
		ref('moneyCategories').push({name: value, moneyType: 2, userId: userId});
	}

	removeOptions(item){
        // ref('moneyCategories').child(item.value).remove();
        this.props.mutationAction({ variables: { id: item.value }, test: 'HAHAHA' });
        console.log('REMOVE', item.value, this.props.mutationAction);
	}

	updateOption(item, value){
		ref('moneyCategories').child(item.value).update({name: value});
	}

	addMoney(){
		const value = this.money.value*1;
		
		ref('monies').push({
			value: value,
			moneyCategoryId: this.state.selectedOption && this.state.selectedOption.value,
			moneyType: 1,
			userId: userId,
			created: Date.now()
		});

		this.money.value = '';
    }

	render(){
		return(
            <React.Fragment>
                <h1>TOTAL: {this.state.total}</h1>

                <div className='box-megaSelect'>
                    <div className='box-header'>
                        <div className='box-append'>
                            <div className='box-input box-line'>
                                <input type='text' placeholder='Money...' ref={el => this.money = el}/>
                                <span className='span'></span>
                            </div>
                            <span className='icon' title='Submit' onClick={this.addMoney}>
                                Submit
                            </span>
                        </div>
                    </div>

                    <div className='box-header'>
                        <span>
                            <div className='input-radio'>
                                <input type='radio' name='moneyType' id='moneyIn' />
                                <label htmlFor='moneyIn'>in</label>
                            </div>
                        </span>
                        <span>
                            <div className='input-radio'>
                                <input type='radio' name='moneyType' id='moneyOut' defaultChecked />
                                <label htmlFor='moneyOut'>out</label>
                            </div>
                        </span>
                    </div>

                    <div className='box-header v02'>
                        <span>
                            {this.state.selectedOption ? this.state.selectedOption.label : 'Select...'}
                        </span>
                    </div>

                    <MegaSelect options={this.state.items} 
                        onSelect={item => this.selectOption(item)}
                        onAdd={value => this.addOptions(value)}
                        onRemove={item => this.removeOptions(item)}
                        onUpdate={(item, value) => this.updateOption(item, value)}
                    />
                </div>
            
                <h1>RESULT</h1>
                <MoneyStats />
            </React.Fragment>
		);
	}
}

const moniesQuery = gql`
{
    monies {
        id
        value
        created
        moneyCategoryId
    }
}
`;

const moneyCategoriesQuery = gql`
{
    moneyCategories {
        id
        name
    }
}
`;

const mutate = gql`
    mutation removeMoneyCategory($id: ID) {
        removeMoneyCategory(id: $id)
    }
`;

export default compose(
    // graphql(moniesQuery, {name: 'moniesData'}),
    graphql(moneyCategoriesQuery),
    ApolloMutation({mutation: mutate})
)(MoneyBox);

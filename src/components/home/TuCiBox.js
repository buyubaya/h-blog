import React from 'react';
import { PropTypes } from 'prop-types';
import { Tabs } from 'antd';
import MoneyMegaForm from 'components/home/MoneyMegaForm';
import FormAddReason from 'components/home/FormAddReason';
import FormEditMoneyCategory from 'components/home/FormEditMoneyCategory';


class TuCiBox extends React.PureComponent {
    constructor(){
        super();

        this.state = {
            tab: '1',
            moneyType: 2,
            editItem: null
        };

        this._renderTuCiTab = this._renderTuCiTab.bind(this);
        this.setMoneyType = this.setMoneyType.bind(this);
        this.setEditItem = this.setEditItem.bind(this);
        this.setTab = this.setTab.bind(this);
    }

    static childContextTypes = {
        moneyType: PropTypes.number,
        editItem: PropTypes.object,
        setEditItem: PropTypes.func,
        setTab: PropTypes.func
    };

    getChildContext(){
        return({
            moneyType: this.state.moneyType,
            editItem: this.state.editItem,
            setEditItem: this.setEditItem,
            setTab: this.setTab
        });
    }

    setEditItem(editItem){
        this.setState({ editItem });
    }

    setTab(tab){
        this.setState({ tab });
    }

    setMoneyType(moneyType){
        return e => {
            this.setState({ moneyType });
        };
    }

    _renderTuCiTab(){
        return(
            <div className='tuciTabHeader'>
                <span 
                    className={this.state.moneyType === 1 ? 'is-active' : null} 
                    onClick={this.setMoneyType(1)}>
                    TU
                </span>
                <span 
                    className={this.state.moneyType === 2 ? 'is-active' : null}
                    onClick={this.setMoneyType(2)}>
                    CI
                </span>
            </div>
        );
    }

    render(){
        return(
            <div className='tuci-box'>
                <Tabs 
                    defaultActiveKey='1' 
                    activeKey={this.state.tab} 
                    onChange={this.setTab}
                >
                    <Tabs.TabPane tab={this._renderTuCiTab()} key='1'>
                        <MoneyMegaForm moneyType={this.state.moneyType} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='ADD' key='2'>
                        <FormAddReason moneyType={this.state.moneyType} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='EDIT' key='3'>
                        HELLO TAB 3
                        {
                            this.state.editItem &&
                            <FormEditMoneyCategory editItem={this.state.editItem} />
                        }
                        <pre>{JSON.stringify(this.state.editItem, null, 4)}</pre>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
} 


export default TuCiBox;
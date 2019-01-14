import React, {PropTypes} from 'react';

class MegaSelect extends React.Component {
	constructor() {
    		super();

		this.state = {
			open: false,
			options: [],
			filteredOptions: null,
			selectedOption: null,
			editingOption: null
		};
		
		this.handleSelect = this.handleSelect.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentWillReceiveProps(props){
		this.setState({options: props.options}, () => this.updateFilter());
	}
	
	handleAdd(){
		const value = this.itemAdd.value.trim();
		const check = this.state.options.find(item => item.label === value);

		if(!!value && !check){
			this.props.onAdd && this.props.onAdd(value);
			this.itemAdd.value = '';
		}
	}
	
	handleSearch(value){
		const reg = new RegExp(value, 'gi');
		const filteredOptions = this.state.options.filter(item => item.label.match(reg));
		this.setState({filteredOptions});
    }
    
    handleSelect(item){
		this.setState({selectedOption: item});
		this.props.onSelect && this.props.onSelect(item);
    }

    handleRemove(item){
		this.props.onRemove && this.props.onRemove(item);
	}
	
	handleEdit(item){
		this.setState({editingOption: item});
	}

	handleUpdate(item){
		this.setState({editingOption: null});
		this.props.onUpdate && this.props.onUpdate(item, this.editingOption.value);
	}

	updateFilter(){
		if(this.state.filteredOptions){
			this.handleSearch(this.itemSearch.value);
		}
	}

	render() {
		let {options, selectedOption, filteredOptions, editingOption} = this.state;
		options = filteredOptions ? filteredOptions : options ;

		return (
			<div className='box-body'>
				<div className='box-row border-bottom'>
					<div className='box-append'>
						<div className='box-input'>
							<input name='' placeholder='Search...' ref={el => this.itemSearch = el} onChange={e => this.handleSearch(e.target.value)} />
							<span className='span'></span>
						</div>
						<span className='icon fa fa-search' title='Search'></span>
					</div>
				</div>
				<ul className='nav megaSelect-options'>
					{
                        options && options.map((item, index) => (
                            <li key={index} onClick={e => this.handleSelect(item)}>
								{
									(editingOption && editingOption.value === item.value)
									?
									<div className='option'>
										<span title={item.label}>
											<input type='text' defaultValue={item.label} ref={el => this.editingOption = el} />
										</span>
										<span className='icon fa fa-check' title='Update' onClick={e => this.handleUpdate(item)}></span>
										<span className='icon fa fa-times' title='Remove' onClick={e => this.handleRemove(item)}></span>
									</div>
									:
									<div className='option'>
										<span title={item.label}>{item.label}</span>
										<span className='icon fa fa-edit' title='Edit' onClick={e => this.handleEdit(item)}></span>
										<span className='icon fa fa-times' title='Remove' onClick={e => this.handleRemove(item)}></span>
									</div> 
								}
                            </li>
                        ))	
					}	
				</ul>

				<div className='box-row border-top'>
					<div className='box-append'>
						<div className='box-input'>
							<input name='' placeholder='Add...' ref={el => this.itemAdd = el} />
							<span className='span'></span>
						</div>
						<span className='icon fa fa-plus' title='Add' onClick={this.handleAdd}></span>	
					</div>							
				</div>
			</div>
		);
	}
}

export default MegaSelect;
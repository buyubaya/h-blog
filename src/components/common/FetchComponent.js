import React from 'react';


class FetchComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            content: null
        }
    }

    componentDidMount(){
        this.setState({ content: this.props.onLoading() })
        fetch(this.props.url)
        .then(res => res.json())
        .then(
            res => this.setState({ content: this.props.onSuccess(res) }),
            res => this.setState({ content: this.props.onError() })
        )
    }

    render(){
        return this.state.content;
    }
}


export default FetchComponent;
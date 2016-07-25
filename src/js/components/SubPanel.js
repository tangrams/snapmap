import React from 'react'

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
import NavItem from 'react-bootstrap/lib/NavItem';

class SubPanel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false
        };
    }

    render() {
        return (
            <span>
                <NavItem onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.name}</NavItem>
                <Panel collapsible expanded={this.state.open}>
                    {this.props.children}
                </Panel>
            </span>
        );
    }
}

export default SubPanel
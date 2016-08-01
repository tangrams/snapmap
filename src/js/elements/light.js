import React from 'react';

// Custom components
import ButtonColor from '../components/ButtonColor'

class Light extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div>
                    <span className='element_label'>Ambient:</span>
                    <ButtonColor color={this.props.config.ambient} address={this.props.address+':ambient'} update={this.props.update}/>
                </div>
                <div>
                    <span className='element_label'>Diffuse:</span>
                    <ButtonColor color={this.props.config.diffuse} address={this.props.address+':diffuse'} update={this.props.update}/>
                </div>
            </div>
        );
    }
}

export default Light;
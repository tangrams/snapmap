import React from 'react';
import { SketchPicker } from 'react-color';

class ButtonColor extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            displayColorPicker: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.valueChange = this.valueChange.bind(this);
    }
  
    handleClick () {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose () {
        this.setState({ displayColorPicker: false })
    }

    valueChange (color) {
        this.setState({ color: color.hex })
        this.props.update({ address: this.props.address, value: color.hex});
    }

    render() {
        const styles = {
            color: {
                width: '100%',
                height: '100%',
                borderRadius: '2px',
                background: `${this.props.color}`
            },
            swatch: {
                width: '36px',
                height: '22px',
                padding: '5px',
                transform: 'translate(0px,7px)',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            },
            popover: {
                position: 'absolute',
                zIndex: '2'
            },
            cover: {
                position: 'fixed',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            }
        }

        return (
            <span>
                <div style={styles.swatch} onClick={ this.handleClick }>
                    <div style={styles.color} />
                </div>
                
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.color } onChange={ this.valueChange }/>
                    </div> : null}
            </span>
        );
    }
}

export default ButtonColor
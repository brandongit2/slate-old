import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {generate} from 'shortid';

import {changeTool} from '../../actions';
import './index.css';

export let Toolbar = ({currentTool, changeTool, size}) => {
    let tools = ['brush', 'rectangle', 'text'];
    return (
        <div className="panel toolbar" style={{flexBasis: size}}>
            <h2>toolbar</h2>
            <ul id="list">
                {tools.map(tool => (
                    <li
                        key={generate()}
                        onClick={() => { changeTool(tool); }}
                        onTouchStart={() => { changeTool(tool); }}
                        className={currentTool === tool ? 'current' : ''}
                    >
                        {`${tool} tool`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Toolbar.propTypes = {
    changeTool:  PropTypes.func.isRequired,
    currentTool: PropTypes.string.isRequired,
    size:        PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
    changeTool: tool => { dispatch(changeTool(tool)); }
});

Toolbar = connect(null, mapDispatchToProps)(Toolbar);

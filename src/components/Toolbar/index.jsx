import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeTool} from '../../actions';
import './index.css';

export let Toolbar = ({width, changeTool}) => (
    <div className="toolbar" style={{flexBasis: width}}>
        <ul>
            <li onClick={() => { changeTool('brush'); }}>brush</li>
            <li onClick={() => { changeTool('rectangle'); }}>rectangle</li>
        </ul>
    </div>
);

Toolbar.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    changeTool: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    changeTool: tool => { dispatch(changeTool(tool)); }
});

Toolbar = connect(null, mapDispatchToProps)(Toolbar);

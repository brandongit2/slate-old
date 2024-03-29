import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {hideDialog} from '../../actions';
import './index.css';

export let Dialog = ({hide, visible, title, content}) => (
    <div className="dialog-container" style={{
        zIndex:  visible ? 100 : -100,
        opacity: visible ? 1 : 0
    }}>
        <div className="dialog">
            <h1>{title}</h1>
            <p>{content}</p>
            <button type="button" onClick={hide}>dismiss</button>
        </div>
    </div>
);

Dialog.defaultProps = {
    content: ''
};

Dialog.propTypes = {
    hide:    PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    title:   PropTypes.string.isRequired,
    content: PropTypes.string
};

const mapStateToProps = state => ({
    visible: state.isDialogVisible,
    title:   state.dialog.title,
    content: state.dialog.content
});

const mapDispatchToProps = dispatch => ({
    hide: () => { dispatch(hideDialog()); }
});

Dialog = connect(mapStateToProps, mapDispatchToProps)(Dialog);

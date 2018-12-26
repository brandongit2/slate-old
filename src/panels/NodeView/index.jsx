import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {generate} from 'shortid';

import './index.css';

export let NodeView = ({nodes, size}) => (
    <div className="panel-container node-view" style={{flexBasis: size}}>
        <div className="panel">
            <h2>nodes</h2>
            <div>
                {Object.keys(nodes).map(node => (
                    <p key={generate()}>{node}</p>
                ))}
            </div>
            <div id="actions">
                <span>add layer</span>
            </div>
        </div>
    </div>
);

NodeView.propTypes = {
    nodes: PropTypes.object.isRequired,
    size:  PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    nodes: state.nodes
});

NodeView = connect(mapStateToProps)(NodeView);

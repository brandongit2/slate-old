import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {GroupView} from './GroupView';
import './index.css';

export let NodeView = ({currentNode, things}) => (
    <div className="node-view">
        <h2>nodes</h2>
        <div className="node-list">
            <GroupView things={things}
                       content={things.root.nodes}
                       currentNode={currentNode}>
                Root
            </GroupView>
        </div>
        <div id="actions"></div>
    </div>
);

NodeView.propTypes = {
    currentNode: PropTypes.string.isRequired,
    things:      PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    currentNode: state.currentNode,
    things:      state.things
});

NodeView = connect(mapStateToProps)(NodeView);

import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {generate} from 'shortid';

import {addGroup, switchNode} from '../../actions';
import {NodeList} from './NodeList';
import './index.css';

export let NodeView = ({add, currentNode, nodeList, switchNd}) => (
    <div className="node-view">
        <h2>nodes</h2>
        <div id="content">
            <NodeList nodes={nodeList} currentNode={currentNode} />
            <div id="actions">
                <button type="button"
                        onClick={() => {
                            let id = generate();
                            add(id, 'Drawing', 'draw', []);
                            switchNd(id);
                        }}>
                    add drawing group
                </button>
            </div>
        </div>
    </div>
);

NodeView.propTypes = {
    add:         PropTypes.func.isRequired,
    switchNd:    PropTypes.func.isRequired,
    currentNode: PropTypes.string.isRequired,
    nodeList:    PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentNode: state.currentNode,
    nodeList:    state.nodes
});

const mapDispatchToProps = dispatch => ({
    add: (parentGroup, id, displayName) => {
        dispatch(addGroup(parentGroup, id, displayName, 'draw', []));
    },
    switchNd: id => { dispatch(switchNode(id)); }
});

NodeView = connect(mapStateToProps, mapDispatchToProps)(NodeView);

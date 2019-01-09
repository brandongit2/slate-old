import PropTypes from 'prop-types';
import React from 'react';

export const NodeList = ({nodes}) => (
    <div>
        {Object.keys(nodes).map(nodeId => {
            let node = nodes[nodeId];
            if (node.type === 'node') {
                return (
                    <div key={`node_${node.id}`}>
                        {node.displayName}
                    </div>
                );
            }
        })}
    </div>
);

NodeList.propTypes = {
    nodes: PropTypes.object.isRequired
};

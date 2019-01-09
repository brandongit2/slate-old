import PropTypes from 'prop-types';
import React from 'react';

export const GroupView = ({children, things, content}) => (
    <div className="group-view">
        <div className="entry-container">{children}</div>
        <div className="children">
            {content.map(thingId => {
                let thing = things[thingId];
                if (thing.thingType === 'group') {
                    return (
                        <GroupView key={`group_${thingId}`}
                                   things={things}
                                   content={thing.nodes}>
                            {thing.displayName}
                        </GroupView>
                    );
                } else if (thing.thingType === 'node') {
                    return (
                        <div key={`node_${thingId}`}
                             className="entry-container">
                            {thing.displayName}
                        </div>
                    );
                }
            })}
        </div>
    </div>
);

GroupView.propTypes = {
    children: PropTypes.string.isRequired,
    things:   PropTypes.object.isRequired,
    content:  PropTypes.array.isRequired
};

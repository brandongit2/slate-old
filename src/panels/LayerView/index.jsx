import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {renameLayer} from '../../actions';
import './index.css';

export let LayerView = ({renameLayer, layers, layerOrder, size}) => (
    <div className="panel-container layer-view" style={{flexBasis: size}}>
        <div className="panel">
            <h2>layers</h2>
            <div id="content">
                <div>
                    {(() => {
                        let arr = [];
                        layerOrder.forEach(layer => {
                            if (layers[layer] != null) {
                                arr.push(
                                    <div
                                        className="entry-container"
                                        key={`input_${layer}`}
                                    >
                                        <input
                                            type="text"
                                            value={layers[layer].name}
                                            onChange={e => {
                                                renameLayer(layer, e.target.value);
                                            }}
                                        />
                                    </div>
                                );
                            }
                        });
                        return arr;
                    })()}
                </div>
                <div id="actions">
                    <span>add layer</span>
                </div>
            </div>
        </div>
    </div>
);

LayerView.propTypes = {
    renameLayer: PropTypes.func.isRequired,
    layers:      PropTypes.object.isRequired,
    layerOrder:  PropTypes.array.isRequired,
    size:        PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    layers:     state.layers.layers,
    layerOrder: state.layers.order
});

const mapDispatchToProps = dispatch => ({
    renameLayer: (id, name) => { dispatch(renameLayer(id, name)); }
});

LayerView = connect(mapStateToProps, mapDispatchToProps)(LayerView);

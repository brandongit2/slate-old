import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {generate} from 'shortid';

import {addLayer, renameLayer} from '../../actions';
import './index.css';

export let LayerView = ({add, rename, layers, layerOrder, size}) => (
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
                                                rename(layer, e.target.value);
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
                    <button
                        type="button"
                        onClick={() => {
                            add(generate(), 'draw', 'Drawing', []);
                        }}
                    >
                        add drawing layer
                    </button>
                </div>
            </div>
        </div>
    </div>
);

LayerView.propTypes = {
    add:         PropTypes.func.isRequired,
    rename:      PropTypes.func.isRequired,
    layers:      PropTypes.object.isRequired,
    layerOrder:  PropTypes.array.isRequired,
    size:        PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    layers:     state.layers.layers,
    layerOrder: state.layers.order
});

const mapDispatchToProps = dispatch => ({
    add: (id, type, name, nodes) => {
        dispatch(addLayer(id, type, name, nodes));
    },
    rename: (id, name) => { dispatch(renameLayer(id, name)); }
});

LayerView = connect(mapStateToProps, mapDispatchToProps)(LayerView);

import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {generate} from 'shortid';

import {addLayer, renameLayer, switchLayer} from '../../actions';
import './index.css';

export let LayerView = ({
    add, rename, currentLayer, layers, layerOrder, switchLay
}) => (
    <div className="layer-view">
        <h2>layers</h2>
        <div id="content">
            <div>
                {layerOrder.map(layer => (
                    <div className="entry-container"
                         key={`input_${layer}`}>
                        <input type="text"
                               value={layers[layer].name}
                               style={{fontWeight: layer === currentLayer ? '600' : '400'}}
                               onChange={e => {
                                   rename(layer, e.target.value);
                               }} />
                    </div>
                ))}
            </div>
            <div id="actions">
                <button type="button"
                        onClick={() => {
                            let id = generate();
                            add(id, 'draw', 'Drawing', []);
                            switchLay(id);
                        }}>
                    add drawing layer
                </button>
            </div>
        </div>
    </div>
);

LayerView.propTypes = {
    add:          PropTypes.func.isRequired,
    rename:       PropTypes.func.isRequired,
    currentLayer: PropTypes.string.isRequired,
    layers:       PropTypes.object.isRequired,
    layerOrder:   PropTypes.array.isRequired,
    switchLay:    PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    currentLayer: state.layers.current,
    layers:       state.layers.layers,
    layerOrder:   state.layers.order
});

const mapDispatchToProps = dispatch => ({
    add: (id, type, name, nodes) => {
        dispatch(addLayer(id, type, name, nodes));
    },
    rename:    (id, name) => { dispatch(renameLayer(id, name)); },
    switchLay: id => { dispatch(switchLayer(id)); }
});

LayerView = connect(mapStateToProps, mapDispatchToProps)(LayerView);

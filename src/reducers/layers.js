function layers(state = {}, action) {
    switch (action.type) {
        case 'ADD_LAYER':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.id]: {
                        name:  action.name,
                        type:  action.type,
                        nodes: action.nodes,
                        props: action.props
                    }
                },
                order: [action.id, ...state.order]
            };
        case 'ADD_TO_LAYER':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.id]: {
                        ...state.layers[action.id],
                        nodes: [...state.layers[action.id].nodes, action.node]
                    }
                }
            };
        case 'REMOVE_LAYER': {
            let newState = JSON.parse(JSON.stringify(state.layers)); // Clones state
            delete newState[action.id];
            let newOrder = JSON.parse(JSON.stringify(state.order)); // Clones state
            let index = newOrder.indexOf(action.id);
            newOrder.splice(index, 1);
            return {
                ...state,
                layers: newState,
                order:  newOrder
            };
        }
        case 'REMOVE_FROM_LAYER': {
            let newNodes = JSON.parse(JSON.stringify(state.layers[action.id].nodes)); // Clones state
            let index = newNodes.indexOf(action.node);
            newNodes.splice(index, 1);
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.id]: {
                        ...state.layers[action.id],
                        nodes: newNodes
                    }
                }
            };
        }
        case 'RENAME_LAYER':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.id]: {
                        ...state.layers[action.id],
                        name: action.name
                    }
                }
            };
        default:
    }

    return state;
}

export default layers;

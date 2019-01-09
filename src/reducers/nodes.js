import {getParentId} from '../utils';

export function currentNode(state = {}, action) {
    if (action.type === 'SWITCH_NODE') {
        return action.id;
    } else {
        return state;
    }
}

export function groups(state = {}, action) {
    switch (action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                [action.id]: {
                    displayName: action.displayName,
                    type:        action.groupType,
                    nodes:       []
                }
            };
        case 'ADD_NODE':
            return {
                ...state,
                [action.parentGroup]: {
                    ...state[action.parentGroup],
                    nodes: [action.id, ...state[action.parentGroup].nodes]
                }
            };
        case 'REMOVE_GROUP': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            delete newState[action.id];

            let parentId = getParentId(action.id, state);
            let parent = newState[parentId].nodes;
            let index = parent.indexOf(action.id);
            newState[parentId].nodes.splice(index, 1);
            return newState;
        }
        case 'REMOVE_NODE': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            let parentId = getParentId(action.id, state);
            let parent = state[parentId].nodes;
            let index = parent.indexOf(action.id);
            newState[parentId].nodes.splice(index, 1);
            return newState;
        }
        case 'RENAME_GROUP': {
            return {
                ...state,
                [action.id]: {
                    ...state[action.groupId],
                    displayName: action.displayName
                }
            };
        }
        case 'MOVE_NODE': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            let parentId = getParentId(action.nodeId, state);
            let parent = state[parentId].nodes;
            let index = parent.indexOf(action.nodeId);
            if (index !== -1) newState[parentId].nodes.splice(index, 1);

            newState[action.parentGroup].splice(action.index, 0, action.nodeId);
            return newState;
        }
        default:
            return state;
    }
}

export function nodes(state = {}, action) {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                [action.id]: {
                    displayName: action.displayName,
                    svgObject:   action.svgObject
                }
            };
        case 'REMOVE_NODE': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            delete newState[action.id];
            return newState;
        }
        case 'RENAME_NODE':
            return {
                ...state,
                [action.nodeId]: {
                    ...state.list[action.nodeId],
                    displayName: action.newName
                }
            };
        default:
            return state;
    }
}

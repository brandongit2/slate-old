import {getParentId} from '../utils';

export function currentNode(state = {}, action) {
    if (action.type === 'SWITCH_NODE') {
        return action.id;
    } else {
        return state;
    }
}

export function things(state = {}, action) {
    switch (action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                [action.parentGroup]: {
                    ...state[action.parentGroup],
                    nodes: [action.id, ...state[action.parentGroup].nodes]
                },
                [action.id]: {
                    thingType:   'group',
                    displayName: action.displayName,
                    type:        action.groupType,
                    expanded:    action.expanded,
                    nodes:       []
                }
            };
        case 'ADD_NODE':
            return {
                ...state,
                [action.id]: {
                    thingType:   'node',
                    displayName: action.displayName,
                    svgObject:   action.svgObject
                },
                [action.parentGroup]: {
                    ...state[action.parentGroup],
                    nodes: [action.id, ...state[action.parentGroup].nodes]
                }
            };
        case 'REMOVE_THING': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            delete newState[action.id];

            let parentId = getParentId(action.id, state);
            let parent = newState[parentId].nodes;
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
        case 'MOVE_THING': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            let parentId = getParentId(action.id, state);
            let parent = state[parentId].nodes;
            let index = parent.indexOf(action.id);
            if (index !== -1) newState[parentId].nodes.splice(index, 1);

            newState[action.parentGroup].splice(action.index, 0, action.id);
            return newState;
        }
        case 'RENAME_THING':
            return {
                ...state,
                [action.id]: {
                    ...state.list[action.id],
                    displayName: action.newName
                }
            };
        default:
            return state;
    }
}

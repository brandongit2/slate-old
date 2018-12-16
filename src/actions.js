export const changeTool = tool => ({
    type: 'CHANGE_TOOL',
    tool
});

export const newTouch = (id, x, y) => ({
    type: 'NEW_TOUCH',
    id,
    x,
    y
});

export const windowResize = (width, height) => ({
    type: 'WINDOW_RESIZE',
    width,
    height
});

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

import PropTypes from 'prop-types';
import React from 'react';

export const RectSettings = ({currentSettings, updateSettings}) => (
    <table>
        <tbody>
            <tr>
                <td className="label">
                    <label htmlFor="strokeWidth">stroke width:</label>
                </td>
                <td>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        name="brushSize"
                        defaultValue={currentSettings.rect.strokeWidth}
                        onChange={e => {
                            updateSettings('rect', 'strokeWidth', e.target.value);
                        }}
                    />
                </td>
            </tr>
            {/* eslint-disable-next-line eqeqeq */}
            <tr className={currentSettings.rect.strokeWidth == 0 ? 'disabled' : ''}>
                <td className="label">
                    <label htmlFor="stroke">stroke color:</label>
                </td>
                <td>
                    <input
                        type="color"
                        name="stroke"
                        defaultValue={currentSettings.rect.stroke}
                        disabled={currentSettings.rect.strokeWidth == 0 /* eslint-disable-line eqeqeq */}
                        onChange={e => {
                            updateSettings('rect', 'stroke', e.target.value);
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td className="label">
                    <label htmlFor="fill">fill color:</label>
                </td>
                <td>
                    <input
                        type="color"
                        name="fill"
                        defaultValue={currentSettings.rect.fill}
                        onChange={e => {
                            updateSettings('rect', 'fill', e.target.value);
                        }}
                    />
                </td>
            </tr>
        </tbody>
    </table>
);

RectSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};

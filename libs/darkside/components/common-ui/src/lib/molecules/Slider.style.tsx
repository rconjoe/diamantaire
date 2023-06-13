import { BLACK, GREY, GREY_LIGHTER, GREY_LIGHTEST, TEAL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledSlider = styled.div`
  position: relative;
  margin: 0;
  padding: 0 8px;
  width: 100%;

  .vo-slider-target,
  .vo-slider-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .vo-slider-target {
    position: relative;
    height: 4px;
  }

  .vo-slider-base,
  .vo-slider-connects {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  /* Wrapper for all connect elements.*/

  .vo-slider-connects {
    overflow: hidden;
    z-index: 0;
  }

  .vo-slider-connect,
  .vo-slider-origin {
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 0 0;
    transform-style: flat;
  }

  /* Offset direction */

  .vo-slider-txt-dir-rtl.vo-slider-horizontal .vo-slider-origin {
    left: 0;
    right: auto;
  }

  /* Give origins 0 height/width so they don't 
     interfere with clicking the * connect elements.
  */

  .vo-slider-vertical .vo-slider-origin {
    top: -100%;
    width: 0;
  }

  .vo-slider-horizontal .vo-slider-origin {
    height: 0;
  }

  .vo-slider-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .vo-slider-touch-area {
    background: ${TEAL};
    border-radius: 50%;
    height: 15px;
    width: 15px;
  }

  .vo-slider-state-tap .vo-slider-connect,
  .vo-slider-state-tap .vo-slider-origin {
    -webkit-transition: transform 0.3s;
    transition: transform 0.3s;
  }

  .vo-slider-state-drag * {
    cursor: inherit !important;
  }

  /* Slider size and handle placement; */

  .vo-slider-horizontal {
    height: 4px;
  }

  .vo-slider-horizontal .vo-slider-handle {
    width: 30px;
    height: 30px;
    right: -15px;
    top: -13px;
  }

  .vo-slider-vertical {
    width: 4px;
  }

  .vo-slider-vertical .vo-slider-handle {
    width: 30px;
    height: 30px;
    right: -13px;
    bottom: -15px;
  }

  .vo-slider-txt-dir-rtl.vo-slider-horizontal .vo-slider-handle {
    left: -15px;
    right: auto;
  }

  .vo-slider-target {
    background: ${GREY_LIGHTER};
    border-radius: 2px;
    border: 0;
  }

  .vo-slider-connects {
    border-radius: 2px;
  }

  .vo-slider-connect {
    background: ${TEAL};
  }

  /* Handles and cursors; */

  .vo-slider-draggable {
    cursor: ew-resize;
  }

  .vo-slider-vertical .vo-slider-draggable {
    cursor: ns-resize;
  }

  .vo-slider-handle {
    border: 0;
    height: 30px;
    width: 30px;
    top: -5px;
    right: -9px;
  }

  .vo-slider-active {
    box-shadow: none;
  }

  /* Disabled state; */

  [disabled] .vo-slider-connect {
    background: ${GREY_LIGHTEST};
  }

  [disabled].vo-slider-target,
  [disabled].vo-slider-handle,
  [disabled] .vo-slider-handle {
    cursor: not-allowed;
  }

  /* Base; */

  .vo-slider-pips,
  .vo-slider-pips * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .vo-slider-pips {
    position: absolute;
    color: ${GREY};
  }

  /* Values; */

  .vo-slider-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }

  .vo-slider-value-sub {
    color: ${GREY};
    font-size: 10px;
  }

  /* Markings; */

  .vo-slider-marker {
    position: absolute;
    background: ${GREY};
  }

  .vo-slider-marker-sub {
    background: ${GREY};
  }

  .vo-slider-marker-large {
    background: ${GREY};
  }

  /* Horizontal layout; */

  .vo-slider-pips-horizontal {
    padding: 10px 0;
    height: 80px;
    top: 100%;
    left: 0;
    width: 100%;
  }

  .vo-slider-value-horizontal {
    -webkit-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);
  }

  .vo-slider-rtl .vo-slider-value-horizontal {
    -webkit-transform: translate(50%, 50%);
    transform: translate(50%, 50%);
  }

  .vo-slider-marker-horizontal.vo-slider-marker {
    margin-left: -1px;
    width: 2px;
    height: 5px;
  }

  .vo-slider-marker-horizontal.vo-slider-marker-sub {
    height: 4px;
  }

  .vo-slider-marker-horizontal.vo-slider-marker-large {
    height: 15px;
  }

  /* Vertical layout; */

  .vo-slider-pips-vertical {
    padding: 0 10px;
    height: 100%;
    top: 0;
    left: 100%;
  }

  .vo-slider-value-vertical {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    padding-left: 25px;
  }

  .vo-slider-rtl .vo-slider-value-vertical {
    -webkit-transform: translate(0, 50%);
    transform: translate(0, 50%);
  }

  .vo-slider-marker-vertical.vo-slider-marker {
    width: 5px;
    height: 2px;
    margin-top: -1px;
  }

  .vo-slider-marker-vertical.vo-slider-marker-sub {
    width: 4px;
  }

  .vo-slider-marker-vertical.vo-slider-marker-large {
    width: 15px;
  }

  .vo-slider-tooltip {
    display: block;
    position: absolute;
    border-radius: 2px;
    background: ${GREY_LIGHTEST};
    color: ${BLACK};
    padding: 5px;
    text-align: center;
    white-space: nowrap;
  }

  .vo-slider-horizontal .vo-slider-tooltip {
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 120%;
  }

  .vo-slider-vertical .vo-slider-tooltip {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    top: 50%;
    right: 120%;
  }

  .vo-slider-horizontal .vo-slider-origin > .vo-slider-tooltip {
    -webkit-transform: translate(50%, 0);
    transform: translate(50%, 0);
    left: auto;
    bottom: 10px;
  }

  .vo-slider-vertical .vo-slider-origin > .vo-slider-tooltip {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
    top: auto;
    right: 28px;
  }

  .vo-slider-values {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin: 0 -8px 12px;
  }
`;

export default StyledSlider;

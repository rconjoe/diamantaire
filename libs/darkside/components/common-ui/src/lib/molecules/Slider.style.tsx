import styled from 'styled-components';

const StyledSlider = styled.div`
  position: relative;
  margin: 0;
  padding: 0 0.8rem;
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
    height: 0.4rem;
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
    background: var(--color-teal);
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
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
    height: 0.4rem;
  }

  .vo-slider-horizontal .vo-slider-handle {
    width: 3rem;
    height: 3rem;
    right: -1.5rem;
    top: -1.3rem;
  }

  .vo-slider-vertical {
    width: 0.4rem;
  }

  .vo-slider-vertical .vo-slider-handle {
    width: 3rem;
    height: 3rem;
    right: -1.3rem;
    bottom: -1.5rem;
  }

  .vo-slider-txt-dir-rtl.vo-slider-horizontal .vo-slider-handle {
    left: -1.5rem;
    right: auto;
  }

  .vo-slider-target {
    background: var(--color-lighter-grey);
    border-radius: 0.2rem;
    border: 0;
  }

  &.with-pips .vo-slider-target {
    border-radius: 0;
  }

  .vo-slider-connects {
    border-radius: 0.2rem;
  }

  .vo-slider-connect {
    background: var(--color-teal);
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
    height: 3rem;
    width: 3rem;
    top: -0.5rem;
    right: -0.9rem;
  }

  .vo-slider-active {
    box-shadow: none;
  }

  /* Disabled state; */

  [disabled] .vo-slider-connect {
    background: var(--color-lighter-grey);
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
    color: var(--color-grey);
  }

  /* Values; */

  .vo-slider-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }

  .vo-slider-value-sub {
    color: var(--color-grey);
    font-size: 1rem;
  }

  /* Markings; */

  .vo-slider-marker {
    position: absolute;
    background: var(--color-grey);
  }

  .vo-slider-marker-sub {
    background: var(--color-grey);
  }

  .vo-slider-marker-large {
    background: var(--color-grey);
  }

  /* Horizontal layout; */

  .vo-slider-pips-horizontal {
    padding: 0;
    height: 4rem;
    top: 100%;
    left: 0;
    width: 100%;
  }

  .vo-slider-value-horizontal {
    -webkit-transform: translate(-50%, 100%);
    transform: translate(-50%, 100%);
    font-size: var(--font-size-xxxxsmall) !important;
  }

  .vo-slider-rtl .vo-slider-value-horizontal {
    -webkit-transform: translate(50%, 50%);
    transform: translate(50%, 50%);
  }

  .vo-slider-marker-horizontal.vo-slider-marker {
    margin-left: -0.1rem;
    width: 0.1rem;
    height: 0.5rem;
    background: var(--color-lighter-grey);
  }

  .vo-slider-marker-horizontal.vo-slider-marker-sub {
    height: 0.4rem;
  }

  .vo-slider-marker-horizontal.vo-slider-marker-large {
    height: 1.5rem;
    margin-top: -0.4rem;
  }

  /* Vertical layout; */

  .vo-slider-pips-vertical {
    padding: 0 1rem;
    height: 100%;
    top: 0;
    left: 100%;
  }

  .vo-slider-value-vertical {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    padding-left: 2.5rem;
  }

  .vo-slider-rtl .vo-slider-value-vertical {
    -webkit-transform: translate(0, 50%);
    transform: translate(0, 50%);
  }

  .vo-slider-marker-vertical.vo-slider-marker {
    width: 0.5rem;
    height: 0.2rem;
    margin-top: -0.1rem;
  }

  .vo-slider-marker-vertical.vo-slider-marker-sub {
    width: 0.4rem;
  }

  .vo-slider-marker-vertical.vo-slider-marker-large {
    width: 1.5rem;
  }

  .vo-slider-tooltip {
    display: block;
    position: absolute;
    background: transparent;
    color: var(--color-black);
    padding: 0;
    text-align: center;
    white-space: nowrap;
  }

  .vo-slider-horizontal .vo-slider-tooltip {
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 100%;
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
    bottom: 1rem;
  }

  .vo-slider-vertical .vo-slider-origin > .vo-slider-tooltip {
    -webkit-transform: translate(0, -1.8rem);
    transform: translate(0, -1.8rem);
    top: auto;
    right: 2.8rem;
  }

  .vo-slider-values {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-xxxxsmall);
    margin: 0 -0.8rem 1.2rem;
  }
`;

export default StyledSlider;

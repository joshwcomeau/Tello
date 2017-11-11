// I'm using swipe.js to handle swiping between mobile views.
// Unfortunately, some of the views require horizontal scrolling (eg.
// calendar, backlog rows). The swiping overrules the default behaviour.
//
// This utility component allows us to stop the propagation of touch events,
// so that certain areas are scrollable.
import React, { PureComponent } from 'react';

class StopTouchPropagation extends PureComponent {
  componentDidMount() {
    // NOTE: We need to stop propagation on the touch events, so that the
    // parent container's swipe doesn't make the calendar unusable on mobile.
    // Sadly, we can't just use React events like `onTouchStart` because of
    // React's synthetic event system; it fires too late.
    // Need to use the native event system.
    this.elem.addEventListener('touchstart', ev => ev.stopPropagation());
    this.elem.addEventListener('touchmove', ev => ev.stopPropagation());
  }

  render() {
    return <div ref={elem => (this.elem = elem)}>{this.props.children}</div>;
  }
}

export default StopTouchPropagation;

// `FadeOnChange` is a utility component that will fade a component out/in
// whenever its props change. It's a way of highlighting that a section of
// the page has changed (eg. subtitle text changed).
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { requestAnimationFramePromise, setTimeoutPromise } from '../../utils';

class FadeOnChange extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    duration: PropTypes.number,
    changeKey: PropTypes.any,
  };

  static defaultProps = {
    duration: 500,
  };

  state = {
    children: this.props.children,
  };

  setStatePromise = newState =>
    new Promise(resolve => this.setState(newState, resolve));

  componentDidUpdate(prevProps, prevState) {
    // Sometimes, we don't want to look at the children themselves.
    // Children can be React elements, after all, which are regenerated on
    // every render. If we supply a `changeKey`, use it instead.
    // If not, use the children in state. We use state instead of props so
    // that we ignore the update of the children being swapped out mid-fade.
    const hasChanged =
      typeof this.props.changeKey !== 'undefined'
        ? this.props.changeKey !== prevProps.changeKey
        : this.state.children !== prevState.children;

    if (!hasChanged) {
      return;
    }

    // This is a pretty gross sequence of events, but this is a surprisingly
    // tricky problem!
    //
    // We can't simply render the props, because then the text will change
    // RIGHT AWAY, before it even starts fading away. So instead we render
    // the state.children, and only do that swap when it's invisible.
    // This sequence of events is required to ensure that the swap happens at
    // the right time, and the animation works.
    requestAnimationFramePromise()
      .then(() => {
        this.childElem.style.opacity = 0;
      })
      .then(() => setTimeoutPromise(this.props.duration))
      .then(() => this.setStatePromise({ children: this.props.children }))
      .then(() => {
        this.childElem.style.opacity = 1;
      })
      .catch(() => {
        // Swallow errors. The most likely error here is that the component
        // unmounted during the delay between fades. This isn't a big deal.
        //
        // At any rate, this is just a presentational thing with no network
        // side effects, so it's safe to ignore whatever it wants to complain
        // about.
      });
  }

  render() {
    const { duration } = this.props;

    const transition = `opacity ${duration}ms`;

    return (
      <div
        style={{ transition }}
        ref={elem => {
          this.childElem = elem;
        }}
      >
        {this.state.children}
      </div>
    );
  }
}

export default FadeOnChange;

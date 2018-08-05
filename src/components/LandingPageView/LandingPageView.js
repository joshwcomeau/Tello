import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { addShowsReceive, changeSorting } from '../../actions';
import { COLORS, Z_INDICES } from '../../constants';
import { isDesktop } from '../../helpers/responsive.helpers';
import { clamp, throttle } from '../../utils';

import Divider from '../Divider';
import LandingPageHero from '../LandingPageHero';
import LandingPageSummary from '../LandingPageSummary';
import LandingPageBacklog from '../LandingPageBacklog';
import LandingPageCalendar from '../LandingPageCalendar';
import LandingPageSignup from '../LandingPageSignup';

import { SHOWS } from './LandingPageView.data';

class LandingPageView extends PureComponent {
  state = {
    heroOpacity: 1,
    showParticles: true,
  };

  componentDidMount() {
    // For the summary page, we won't actually make any API calls.
    // Instead we'll load some stub data.
    this.props.addShowsReceive({
      shows: SHOWS,
      showNotification: false,
    });

    this.props.changeSorting({ sorting: 'dateAdded' });

    if (isDesktop()) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  calculateOpacity = (elementHeight, scrollAmount) => {
    // If we've scrolled PAST the element entirely, set the opacity to 1.
    // This is so that, when it becomes visible down the page, it isn't affected
    // Adding 10px as a buffer
    if (scrollAmount > elementHeight + 10) {
      return 1;
    }

    const scrollOffset = scrollAmount / elementHeight;

    // Our ideal fade is something like this:
    // -------------------------------------------
    //                      ^ start          ^ end
    // (where the line represents total scroll amount, for the Hero element).
    //
    // The math for normalizing is `offset * n - (n-1)`
    // Where `n` is some ratio:
    // When n === 4, fade happens from 75% to 100% of scroll.
    // When n === 3, fade happens from 66% to 100% of scroll.
    //
    // We also want this to go from 1 to 0, not 0 to 1, so we subtract the
    // total from 1.
    // New formula: `1 - (offset * n - (n - 1))`
    //
    // Because we want the fade to finish at, say, ~95% instead of 100%,
    // we subtract a slight buffer of 0.15.
    // New formula: `1 - (offset * n - (n - (1 - buffer)))`
    //
    // This line looks scary, but hopefully Future Josh will understand this
    // comment!
    const n = 4;
    const unclampedOpacity = 1 - (scrollOffset * n - (n - 1 - 0.15));

    return clamp(unclampedOpacity, 0, 1);
  };

  handleScroll = throttle(() => {
    // As the main content overlaps the hero, we want to fade the hero, for a smoother
    // transition to the main content.
    // This should only start at 66% of the way there, and fade to 0 by 100%.
    const { height } = this.elem.getBoundingClientRect();
    const scrollAmount = window.pageYOffset;

    const nextOpacity = this.calculateOpacity(height, scrollAmount);

    // If we've totally scrolled the hero out of frame, we can stop
    // rendering the (surprisingly expensive) drifting particles.
    // We also want them to stay hidden; no need to resurrect if the
    // user scrolls back up
    const showParticles = scrollAmount < height && this.state.showParticles;

    if (this.state.heroOpacity !== nextOpacity) {
      this.setState({
        heroOpacity: nextOpacity,
        showParticles,
      });
    }
  }, 20);

  render() {
    const {showParticles} = this.state;

    return [
      <HeroOpacityWrapper
        key="hero"
        innerRef={elem => {
          this.elem = elem;
        }}
        style={{ opacity: this.state.heroOpacity }}
      >
        <LandingPageHero showParticles={showParticles} />
      </HeroOpacityWrapper>,
      <MainContent key="content">
        <LandingPageSummary />
        <Divider />
        <LandingPageBacklog />
        <Divider />
        <LandingPageCalendar />
      </MainContent>,
      <LandingPageSignup key="signup" />,
    ];
  }
}

const HeroOpacityWrapper = styled.div`
  will-change: opacity;
`;

const MainContent = styled.div`
  position: relative;
  background: ${COLORS.gray.veryDark};
  z-index: ${Z_INDICES.root + 1};
`;

export default connect(null, { addShowsReceive, changeSorting })(
  LandingPageView
);

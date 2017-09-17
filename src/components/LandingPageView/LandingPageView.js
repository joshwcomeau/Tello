import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'emotion/react';

import { addShowsReceive, changeSorting } from '../../actions';
import { COLORS, Z_INDICES } from '../../constants';
import { clamp } from '../../utils';
import { getToken } from '../../reducers/auth.reducer';

import Divider from '../Divider';
import LandingPageHero from '../LandingPageHero';
import LandingPageSummary from '../LandingPageSummary';
import LandingPageBacklog from '../LandingPageBacklog';
import LandingPageCalendar from '../LandingPageCalendar';
import LandingPageSignup from '../LandingPageSignup';

import { SHOWS } from './LandingPageView.data';


class LandingPageView extends PureComponent {
  static propTypes = {
    hasToken: PropTypes.bool.isRequired,
    addShowsReceive: PropTypes.func.isRequired,
    changeSorting: PropTypes.func.isRequired,
    // From <Route> parent
    history: PropTypes.object.isRequired,
  }

  state = {
    heroOpacity: 1,
  }

  componentDidMount() {
    const { hasToken, history, addShowsReceive, changeSorting } = this.props;

    // If the user is logged in, let's send them to the summary page.
    // NOTE: This means that there is no way for logged-in users to see the
    // landing page. I think this is OK though?
    if (hasToken) {
      history.replace('/summary');
    } else {
      // For the summary page, we won't actually make any API calls.
      // Instead we'll load some stub data.
      addShowsReceive({
        shows: SHOWS,
        showNotification: false,
      });

      changeSorting({ sorting: 'chrono' });

      // window.addEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    // As the main content overlaps the hero, we want to fade the hero, for a smoother
    // transition to the main content.
    // This should only start at 66% of the way there, and fade to 0 by 100%.
    const scrollOffset = window.pageYOffset / window.innerHeight;
    const newOpacity = clamp(1 - (scrollOffset * 3 - 2), 0, 1);

    if (this.state.heroOpacity !== newOpacity) {
      this.setState({
        heroOpacity: newOpacity,
      });
    }
  }

  render() {
    return [
      <HeroOpacityWrapper
        key="hero"
        style={{ opacity: this.state.heroOpacity}}
      >
        <LandingPageHero />
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

const mapStateToProps = state => ({
  hasToken: !!getToken(state),
})

export default connect(
  mapStateToProps,
  { addShowsReceive, changeSorting }
)(LandingPageView);

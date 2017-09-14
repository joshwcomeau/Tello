import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { addShowsReceive } from '../../actions';
import { Z_INDICES } from '../../constants';

import LandingPageHero from '../LandingPageHero';
import LandingPageSummary from '../LandingPageSummary';

import { SHOWS } from './LandingPageView.data';

// TEMP
import GoogleButton from '../GoogleButton';


class LandingPageView extends PureComponent {
  componentDidMount() {
    // For the summary page, we won't actually make any API calls.
    // Instead we'll load some stub data.
    this.props.addShowsReceive({
      shows: SHOWS,
      showNotification: false,
    });
  }

  render() {
    return [
      <LandingPageHero key="hero" />,
      <MainContent key="content">
        <LandingPageSummary />

        {/* TEMP */}
        <GoogleButton />
      </MainContent>,
    ];
  }
}

const MainContent = styled.div`
  position: relative;
  z-index: ${Z_INDICES.root + 1};
`;

export default connect(null, { addShowsReceive })(LandingPageView);

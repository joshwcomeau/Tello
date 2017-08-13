import React, { Component } from "react";

import BacklogRow from '../BacklogRow';


const dummyShow = require('../../stubs/show.json');
const dummyEpisodes = require('../../stubs/episodes.json');

const stub = {
  ...dummyShow,
  episodes: dummyEpisodes,
};


class Backlog extends Component {
  render() {
    return <BacklogRow show={stub} />;
  }
}

export default Backlog;

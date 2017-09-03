import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { editShowRequest, hideModal } from '../../actions';
import { COLORS, UNITS_IN_PX } from '../../constants';
import { getTrackedShowWithSeasons } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Button from '../Button';
import EditShowSeason from '../EditShowSeason';
import Heading from '../Heading';


class EditShow extends Component {
  static propTypes = {
    initialShowData: ShowProps,
    editShowRequest: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  state = {
    // Copy our store from redux into local component state.
    // This is so we can do tentative mutations, without affecting the real
    // data. When the user saves their changes, we send them to the server,
    // and the server response updates the Redux store with the new data.
    show: this.props.initialShowData,
  }

  render() {
    const { show: { name, seasons } } = this.state;

    const episodesBySeason = Object.keys(seasons).map(id => seasons[id]);

    return (
      <EditShowWrapper>
        <Heading>Manage "{name}"</Heading>

        <Section>
          <Heading size="small">
            Delete Show
          </Heading>

          <Paragraph>
            Deleting this show will remove it from your list of tracked shows. You can re-add it again later, but your progress will be lost forever.
          </Paragraph>

          <Button color="red">
            Delete "{name}"
          </Button>
        </Section>

        <Section>
          <Heading size="small">
            Bulk Toggle Episodes
          </Heading>

          <Paragraph>
            Quickly mark all episodes in a season as watched.
          </Paragraph>

          <div>
            {episodesBySeason.map((episodes, index) => (
              <EditShowSeason
                key={index}
                episodes={episodes}
                seasonNum={index + 1}
                handleToggleAll={function() {}}
              />
            ))}
          </div>

        </Section>
      </EditShowWrapper>
    );
  }
}

const EditShowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Section = styled.div`
  margin-top: ${UNITS_IN_PX[2]};

  &:first-of-type {
    margin-bottom: ${UNITS_IN_PX[2]};
  }

  &:last-of-type {
    flex: 1;
    overflow: auto;
  }
`

const Paragraph = styled.p`
  margin-bottom: ${UNITS_IN_PX[1]};
`

const mapStateToProps = (state, ownProps) => ({
  initialShowData: getTrackedShowWithSeasons(state, ownProps.showId),
});

const mapDispatchToProps = { editShowRequest, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(EditShow);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { deleteShowRequest, markSeasonAsSeen, hideModal } from '../../actions';
import { UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { getAiredTrackedShowsArrayWithSeasons } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Button from '../Button';
import EditShowSeason from '../EditShowSeason';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import { confirm } from '../Confirm';

class EditShow extends PureComponent {
  static propTypes = {
    show: ShowProps,
    markSeasonAsSeen: PropTypes.func.isRequired,
    deleteShowRequest: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  state = {
    attemptingDeletion: false,
  };

  componentDidUpdate() {
    const { show, hideModal } = this.props;

    if (!show) {
      hideModal({ side: 'left' });
    }
  }

  handleDeleteClick = () => {
    const { deleteShowRequest, show: { id, name } } = this.props;

    const confirmProps = {
      title: 'Are you sure?',
      children: (
        <span>
          Deleting "{name}" means that you'll <strong>permanently lose</strong>{' '}
          the data about which episodes you've seen, even if you re-add the
          show.
        </span>
      ),
    };

    confirm(confirmProps)
      .then(result => {
        this.setState({ attemptingDeletion: true });

        return result;
      })
      .then(
        result =>
          new Promise(resolve => {
            window.setTimeout(() => resolve(result), 500);
          })
      )
      .then(result => deleteShowRequest({ showId: id, showName: name }));
  };

  renderDeleteSection() {
    const { attemptingDeletion } = this.state;
    const { show: { name } } = this.props;

    return (
      <DeleteSection>
        <Heading size="small">Delete Show</Heading>

        <Paragraph>
          Deleting this show will remove it from your list of tracked shows. You
          can re-add it again later, but your progress will be lost forever.
        </Paragraph>

        <Button
          color="red"
          disabled={attemptingDeletion}
          onClick={this.handleDeleteClick}
        >
          Delete "{name}"
        </Button>
      </DeleteSection>
    );
  }

  renderBulkToggleSection() {
    const { show: { id, name, seasons }, markSeasonAsSeen } = this.props;

    const episodesBySeason = Object.keys(seasons).map(id => seasons[id]);

    // For pre-release shows, there are no episodes to toggle.
    // Skip this section.
    if (episodesBySeason.length === 0) {
      return null;
    }

    return (
      <BulkToggleSection>
        <Heading size="small">Bulk Toggle Episodes</Heading>

        <Paragraph>Quickly mark all episodes in a season as watched.</Paragraph>

        <SeasonList>
          {episodesBySeason.map((episodes, index) => [
            <EditShowSeason
              key={index}
              episodes={episodes}
              seasonNum={index + 1}
              handleToggleAll={() =>
                markSeasonAsSeen({
                  showId: id,
                  showName: name,
                  episodeIds: episodes.map(({ id }) => id),
                })
              }
            />,
            <BorderSpacer key="spacer" />,
          ])}
        </SeasonList>
      </BulkToggleSection>
    );
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <EditShowWrapper>
        <Heading>Manage "{this.props.show.name}"</Heading>

        {this.renderDeleteSection()}

        {this.renderBulkToggleSection()}
      </EditShowWrapper>
    );
  }
}

const EditShowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DeleteSection = styled.section`
  margin-top: ${UNITS_IN_PX[2]};
  margin-bottom: ${UNITS_IN_PX[2]};
`;

const BulkToggleSection = styled.section`
  margin-top: ${UNITS_IN_PX[2]};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SeasonList = styled.div`
  flex: 1;
  overflow: auto;
`;

const BorderSpacer = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: ${HALF_UNIT_PX};
  margin-bottom: ${HALF_UNIT_PX};
`;

const mapStateToProps = (state, ownProps) => ({
  show: getAiredTrackedShowsArrayWithSeasons(state).find(
    show => show.id === ownProps.showId
  ),
});

const mapDispatchToProps = { deleteShowRequest, markSeasonAsSeen, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(EditShow);

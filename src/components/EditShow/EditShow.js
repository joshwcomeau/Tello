import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { deleteShowRequest, markSeasonAsSeen, hideModal } from '../../actions';
import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { getTrackedShowWithSeasons } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Button from '../Button';
import EditShowSeason from '../EditShowSeason';
import Heading from '../Heading';
import { confirm } from '../Confirm';


class EditShow extends PureComponent {
  static propTypes = {
    show: ShowProps,
    markSeasonAsSeen: PropTypes.func.isRequired,
    deleteShowRequest: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  componentDidUpdate() {
    const { show, hideModal } = this.props;

    if (!show) {
      hideModal({ side: 'left' });
    }
  }

  handleDeleteClick = () => {
    const { deleteShowRequest, show } = this.props;

    confirm({
      title: 'Are you sure?',
      children: (
        <span>
          Deleting "{show.name}" means that you'll <strong>permanently lose</strong> the data about which episodes you've seen, even if you re-add the show.
        </span>
      ),
    }).then(result => deleteShowRequest({ showId: show.id }))
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const {
      show: { id, name, seasons, attemptingDeletion },
      markSeasonAsSeen,
      deleteShowRequest,
    } = this.props;

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

          <Button
            color="red"
            disabled={attemptingDeletion}
            onClick={this.handleDeleteClick}
          >
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

          <SeasonList>
            {episodesBySeason.map((episodes, index) => ([
              <EditShowSeason
                key={index}
                episodes={episodes}
                seasonNum={index + 1}
                handleToggleAll={() => markSeasonAsSeen({
                  showId: id,
                  showName: name,
                  episodeIds: episodes.map(({ id }) => id),
                })}
              />,
              <BorderSpacer />
            ]))}
          </SeasonList>

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
    display: flex;
    flex-direction: column;
  }
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
`

const Paragraph = styled.p`
  margin-bottom: ${UNITS_IN_PX[1]};
`

const mapStateToProps = (state, ownProps) => ({
  show: getTrackedShowWithSeasons(state, ownProps.showId),
});

const mapDispatchToProps = { deleteShowRequest, markSeasonAsSeen, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(EditShow);

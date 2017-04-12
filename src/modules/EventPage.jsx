import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'connected-react-router';
import { LinearProgress } from 'material-ui/Progress';

import {
  CardContent,
} from 'material-ui/Card';
import Text from 'material-ui/Text';

import rest from '../utils/rest';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class EventPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
    };
  }


  componentDidMount() {
    const { refreshEvent, eventId } = this.props;

    refreshEvent(eventId);
  }

  render() {
    const {
      eventDetails,
      locale,
      loading,
      intl: { formatMessage },
     } = this.props;

    const dateOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };

    const progress = loading ? <LinearProgress /> : null;

    return (
      <CardWrapper>
        <ResponsiveCard>
          { loading ?
            <CardContent>
              <Text type="headline" component="h1">{ '...' }</Text>
              <Text type="caption">{ '...' }</Text>
              <Text type="body1">{ '...' }</Text>
              <Text type="body1">{ '...' }</Text>
            </CardContent>
            :
            <CardContent>
              <Text type="headline" component="h1">{ eventDetails.name }</Text>
              <Text type="caption">{ formatMessage({ id: 'createdBy' })} { eventDetails.ownerName }</Text>
              <Text type="body1"><b>{ formatMessage({ id: 'eventStartTime' })}:</b> { new Date(eventDetails.startDate).toLocaleString(locale, dateOptions) }</Text>
              <Text type="body1"><b>{ formatMessage({ id: 'description' })}:</b> { eventDetails.description }</Text>
            </CardContent>
          }

          { progress }
        </ResponsiveCard>
      </CardWrapper>
    );
  }
}

export default injectIntl(connect(
  (state, ownProps) => ({
    events: state.events,
    eventDetails: state.eventDetails.data,
    loading: state.eventDetails.loading,
    locale: state.intl.locale,
    eventId: ownProps.match.params.id,
  }),
  dispatch => ({
    refreshEvent: (eventId) => {
      dispatch(rest.actions.eventDetails({ eventId }));
    },
  }),
)(EventPage));

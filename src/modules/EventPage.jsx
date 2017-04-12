import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'connected-react-router';

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
      intl: { formatMessage },
     } = this.props;

    const dateOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }
    return (
      <CardWrapper>
        <ResponsiveCard>
          <CardContent>
            <Text type="headline" component="h1">{ eventDetails.data.name }</Text>
            <Text type="caption">{ formatMessage({ id: 'createdBy' })} { eventDetails.data.ownerName }</Text>
            <Text type="body1"><b>{ formatMessage({ id: 'eventStartTime' })}:</b> { new Date(eventDetails.data.startDate).toLocaleString(locale, dateOptions) }</Text>
            <Text type="body1"><b>{ formatMessage({ id: 'description' })}:</b> { eventDetails.data.description }</Text>

          </CardContent>
        </ResponsiveCard>
      </CardWrapper>
    );
  }
}

export default injectIntl(connect(
  (state, ownProps) => ({
    events: state.events,
    eventDetails: state.eventDetails,
    locale: state.intl.locale,
    eventId: ownProps.match.params.id,
  }),
  dispatch => ({
    refreshEvent: (eventId) => {
      dispatch(rest.actions.eventDetails({ eventId }));
    },
  }),
)(EventPage));

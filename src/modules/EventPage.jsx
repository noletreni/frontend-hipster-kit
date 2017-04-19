import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'connected-react-router';

import {
  CardContent,
} from 'material-ui/Card';
import Text from 'material-ui/Text';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import rest from '../utils/rest';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class EventPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
      id: 3, //TODO: replace with actual id
    };
  }


  componentDidMount() {
    const { refreshEvent } = this.props;

    refreshEvent(this.state.id);
  }

  render() {
    const {
      create,
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
        <ResponsiveCard>
          <CardContent>
            <Text type="headline" component="h1">{ formatMessage({ id: 'register' }) }</Text>
            <TextField
              id="name"
              label={formatMessage({ id: 'name' })}
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <TextField
              id="name"
              label={formatMessage({ id: 'email' })}
              value={this.state}
              onChange={event => this.setState({ email: event.target.value })}
            />
            <Button
              raised
              primary
              onTouchTap={() => create(this.state)}
            >
              {formatMessage({ id: 'send' })}
            </Button>
          </CardContent>
        </ResponsiveCard>
      </CardWrapper>
    );
  }
}

export default injectIntl(connect(
  state => ({
    events: state.events,
    eventDetails: state.eventDetails,
    locale: state.intl.locale,
  }),
  dispatch => ({
    refreshEvent: (eventId) => {
      dispatch(rest.actions.eventDetails({ eventId }));
    },

    create: (registration) => {
      dispatch(rest.actions.events.post({}, {
        body: JSON.stringify(registration),
      }));
    },
  }),
)(EventPage));

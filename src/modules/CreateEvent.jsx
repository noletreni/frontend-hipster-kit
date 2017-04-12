import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Card, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-old/DatePicker';
import TimePicker from 'material-ui-old/TimePicker';

import rest from '../utils/rest';
import theme from '../utils/theme';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class CreateEvent extends React.Component {
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  constructor() {
    super();

    const {
      startTime,
      endTime,
    } = this.state;

    startTime.setMinutes(0);
    startTime.setHours(0);

    endTime.setMinutes(59);
    endTime.setHours(23);
  }

  state = {
    name: '',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    description: '',
  };

  render() {
    const {
      create,
      error,
      locale,
      intl: { formatMessage },
    } = this.props;

    const {
      startDate,
      startTime,
      endDate,
      endTime,
    } = this.state;

    return (
      <CardWrapper>
        <ResponsiveCard>
          <CardContent expandable>
            <TextField
              id="name"
              label={formatMessage({ id: 'eventName' })}
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <DatePicker
              hintText={formatMessage({ id: 'eventStartDate' })}
              value={startDate}
              onChange={(event, startDate) => this.setState({ startDate })}
              locale={locale}
            />
            <TimePicker
              format="24hr"
              hintText={formatMessage({ id: 'eventStartTime' })}
              value={startTime}
              onChange={(event, startTime) => this.setState({ startTime })}
              locale={locale}
            />
            <DatePicker
              hintText={formatMessage({ id: 'eventEndDate' })}
              value={endDate}
              onChange={(event, endDate) => this.setState({ endDate })}
              locale={locale}
            />
            <TimePicker
              format="24hr"
              hintText={formatMessage({ id: 'eventEndTime' })}
              value={endTime}
              onChange={(event, endTime) => this.setState({ endTime })}
              locale={locale}
            />
            <TextField
              id="description"
              label={formatMessage({ id: 'description' })}
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />

            <Text>{ error }</Text>

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

CreateEvent.propTypes = {
  refresh: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(connect(
  state => ({
    events: state.events.data,
    error: state.events.error,
    locale: state.intl.locale,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.events());
    },
    create: (event) => {
      const timedEvent = event;

      timedEvent.startDate.setHours(event.startTime.getHours());
      timedEvent.startDate.setMinutes(event.startTime.getMinutes());
      timedEvent.startDate.setSeconds(0);
      timedEvent.startDate.setMilliseconds(0);

      timedEvent.endDate.setHours(event.endTime.getHours());
      timedEvent.endDate.setMinutes(event.endTime.getMinutes());
      timedEvent.endDate.setSeconds(0);
      timedEvent.endDate.setMilliseconds(0);

      delete timedEvent.startTime;
      delete timedEvent.endTime;

      dispatch(rest.actions.events.post({}, {
        body: JSON.stringify(timedEvent),
      }));
    },
  }),
)(CreateEvent));

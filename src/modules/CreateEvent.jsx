import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Card, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-old/DatePicker';

import rest from '../utils/rest';
import theme from '../utils/theme';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class CreateEvent extends React.Component {
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  state = {
    name: '',
    startDate: null,
    endDate: null,
    description: '',
  };

  render() {
    const { locale, intl: { formatMessage } } = this.props;

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
              onChange={(event, startDate) => this.setState({ startDate })}
              locale={locale}
            />
            <DatePicker
              hintText={formatMessage({ id: 'eventEndDate' })}
              onChange={(event, endDate) => this.setState({ endDate })}
              locale={locale}
            />
            <TextField
              id="description"
              label={formatMessage({ id: 'description' })}
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </CardContent>

        </ResponsiveCard>
      </CardWrapper>
    );
  }
}

CreateEvent.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(connect(
  state => ({
    events: state.events.data,
    locale: state.intl.locale,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.events());
    },
  }),
)(CreateEvent));

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Card, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';

import rest from '../utils/rest';
import theme from '../utils/theme';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class Home extends React.Component {
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const { events, locale, intl: { formatMessage } } = this.props;

    const cardActions = (
      <CardActions>
        <Button raised primary>
          {formatMessage({ id: 'enroll' })}
        </Button>
      </CardActions>
    );

    const eventCards = events.map(event => (
      <ResponsiveCard key={event.id}>
        <CardContent>
          <Text component="h2">
            {event.name}
          </Text>
          <Text component="h3">
            {new Date(event.startDate).toLocaleString(locale)}
          </Text>
          <Text>
            {event.description}
          </Text>
        </CardContent>

        {cardActions}
      </ResponsiveCard>
    ));

    return (
      <CardWrapper>
        {eventCards}
      </CardWrapper>
    );
  }
}

Home.propTypes = {
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
)(Home));

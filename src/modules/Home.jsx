import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import rest from '../utils/rest';
import theme from '../utils/theme';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing.desktopGutter,
  },
  card: {
    flex: 1,
    flexBasis: 400,
  },
};

class Home extends React.Component {
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const { events, locale, intl: { formatMessage } } = this.props;

    const cardActions = (
      <CardActions>
        <FlatButton label="Anmäl dig" />
      </CardActions>
    );
    const eventCards = events.map(event => (
      <Card key={event.id} style={styles.card}>
        <CardHeader
          title={event.name}
          subtitle={new Date(event.startDate).toLocaleString(locale)}
          actAsExpander
          showExpandableButton
        />
        {cardActions}
        <CardText expandable>
          {event.description}
        </CardText>
      </Card>
    ));
    return (
      <div style={styles.wrapper}>
        {eventCards}
      </div>
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

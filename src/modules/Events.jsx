import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'connected-react-router';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui/svg-icons/add';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui-old/Table';

import DialogWithButtons from '../components/DialogWithButtons';

import rest from '../utils/rest';

const styles = {
  eventDetail: {
    paddingTop: 10,
  },
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
};

class Events extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
    };
  }

  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const {
      events,
      locale,
      refreshEvent,
      eventDetails,
      createEvent,
      intl: { formatMessage },
    } = this.props;
    const { dialogOpen } = this.state;

    // Show the following event details in the dialog
    const eventDetailsDescription = eventDetails ? (
      <div>
        <div style={styles.eventDetail}>
          <b>{ formatMessage({ id: 'eventId' })}</b>{`: ${eventDetails.data.id}` }
        </div>
        <div style={styles.eventDetail}>
          <b>{ formatMessage({ id: 'eventDetails' })}</b>{`: ${eventDetails.data.description}` }
        </div>
        <div style={styles.eventDetail}>
          <b>{ formatMessage({ id: 'eventStartDate' })}</b>{`: ${eventDetails.data.startDate}` }
        </div>
      </div>
    ) : null;

    return (
      <div>
        <DialogWithButtons
          title={formatMessage({ id: 'eventDetails' })}
          description={eventDetailsDescription}
          submitAction={formatMessage({ id: 'close' })}
          isOpen={dialogOpen}
          loading={eventDetails && eventDetails.loading}
          submit={() => this.setState({ dialogOpen: false })}
          close={() => this.setState({ dialogOpen: false })}
        />

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{formatMessage({ id: 'eventName' })}</TableHeaderColumn>
              <TableHeaderColumn>{formatMessage({ id: 'eventStartDate' })}</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              // Loop over each event and render a <TableRow>
              events.data.map(event => (
                <TableRow key={event.id} selectable>
                  <TableRowColumn>{event.name}</TableRowColumn>
                  <TableRowColumn>
                    {String(new Date(event.startDate).toLocaleString(locale))}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Button
                      raised
                      primary
                      onTouchTap={() => {
                        refreshEvent(event);
                        this.setState({ dialogOpen: true });
                      }}
                    >
                      {formatMessage({ id: 'showDetails' })}
                    </Button>
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <Button fab primary onTouchTap={() => createEvent()} style={styles.fab}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  eventDetails: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
  createEvent: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshEvent: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(connect(
  state => ({
    events: state.events,
    eventDetails: state.eventDetails,
    locale: state.intl.locale,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.events());
    },
    refreshEvent: (event) => {
      dispatch(rest.actions.eventDetails({ eventId: event.id }));
    },
    createEvent: () => {
      dispatch(push('/events/create'));
    },
  }),
)(Events));

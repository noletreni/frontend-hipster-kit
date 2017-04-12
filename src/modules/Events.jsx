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

import CreateEventDialog from '../components/CreateEventDialog';

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
      createDialogOpen: false,
    };
  }

  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  openDialog(dialogName) {
    this.setState({
      [`${dialogName}DialogOpen`]: true,
    });
  }

  closeDialog(dialogName) {
    this.setState({
      [`${dialogName}DialogOpen`]: false,
    });
  }

  render() {
    const {
      events,
      locale,
      refreshEvent,
      createEvent,
      eventDetails,
      intl: { formatMessage },
    } = this.props;

    const { createDialogOpen } = this.state;

    return (
      <div>
        <CreateEventDialog
          isOpen={createDialogOpen}
          submit={event => createEvent(event)}
          close={() => this.closeDialog('create')}
          loading={false}
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
                      onTouchTap={() => eventDetails(event)}
                    >
                      {formatMessage({ id: 'showDetails' })}
                    </Button>
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <Button fab primary onTouchTap={() => this.openDialog('create')} style={styles.fab}>
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
    locale: state.intl.locale,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.events());
    },
    createEvent: (event) => {
      dispatch(rest.actions.events.post({}, {
        body: JSON.stringify(event),
      }));
    },
    eventDetails: (event) => {
      dispatch(push(`/events/${event.id}`));
    },
  }),
)(Events));

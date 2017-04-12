import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';

import TextField from 'material-ui/TextField';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import DatePicker from 'material-ui-old/DatePicker';
import TimePicker from 'material-ui-old/TimePicker';
import Slide from 'material-ui/transitions/Slide';

import cloneDeep from 'lodash/cloneDeep';

import ImageUpload from '../components/ImageUpload';

const styles = {
  container: {
    position: 'relative',
  },
  fadeContainer: {
    opacity: 0,
  },
  opaqueContainer: {
    opacity: 1,
    maxHeight: 200,
    transition: 'all .5s',
  },
  refreshContainer: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
  },
};

class DialogWithButtons extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

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

  keyDown = (event) => {
    if (event.keyCode === 13) {
      this.submit(this.state);
    }
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  submit = () => {
    const { submit, close } = this.props;

    const event = cloneDeep(this.state);
    event.startDate.setHours(event.startTime.getHours());
    event.startDate.setMinutes(event.startTime.getMinutes());
    event.startDate.setSeconds(0);
    event.startDate.setMilliseconds(0);

    event.endDate.setHours(event.endTime.getHours());
    event.endDate.setMinutes(event.endTime.getMinutes());
    event.endDate.setSeconds(0);
    event.endDate.setMilliseconds(0);

    delete event.startTime;
    delete event.endTime;

    submit(event);
    close();
  };

  render() {
    const {
      title,
      imageUpload,
      cancelAction,
      submitAction,
      submit,
      close,
      isOpen,
      description,
      textField,
      loading,
      intl: { formatMessage },
    } = this.props;

    const {
      startDate,
      startTime,
      endDate,
      endTime,
    } = this.state;

    const progress = loading ? <LinearProgress /> : null;

    const dialogContents = (
      <div style={styles.container}>

        <div style={loading ? styles.fadeContainer : styles.opaqueContainer}>
          <DialogContentText>
            <Text type="headline" component="h2">{formatMessage({ id: 'createEvent' })}</Text>
            <TextField
              id="name"
              label={formatMessage({ id: 'eventName' })}
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              onKeyDown={this.keyDown}
            />
            <TextField
              id="description"
              label={formatMessage({ id: 'description' })}
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
              onKeyDown={this.keyDown}
            />

            <Text type="headline" component="h2">{formatMessage({ id: 'startTime' })}</Text>
            <DatePicker
              hintText={formatMessage({ id: 'eventStartDate' })}
              value={startDate}
              onChange={(event, startDate) => this.setState({ startDate })}
            />
            <TimePicker
              format="24hr"
              hintText={formatMessage({ id: 'eventStartTime' })}
              value={startTime}
              onChange={(event, startTime) => this.setState({ startTime })}
            />

            <Text type="headline" component="h2">{formatMessage({ id: 'endTime' })}</Text>
            <DatePicker
              hintText={formatMessage({ id: 'eventEndDate' })}
              value={endDate}
              onChange={(event, endDate) => this.setState({ endDate })}
            />
            <TimePicker
              format="24hr"
              hintText={formatMessage({ id: 'eventEndTime' })}
              value={endTime}
              onChange={(event, endTime) => this.setState({ endTime })}
            />
          </DialogContentText>
        </div>
      </div>
    );

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={close}
        transition={<Slide direction="up" />}
      >
        <AppBar style={{position: 'relative'}}>
          <Toolbar>
            <IconButton contrast onClick={close}>
              <Icon>close</Icon>
            </IconButton>
            <Text type="title" colorInherit style={{flex: 1}}>Sound</Text>
            <Button contrast onClick={() => this.submit(this.state)}>save</Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          { dialogContents }
        </DialogContent>

        { progress }
      </Dialog>
    );
  }
}

export default injectIntl(DialogWithButtons);

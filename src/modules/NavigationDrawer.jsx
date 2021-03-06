// Disable prop type checking in modules
/* eslint-disable react/prop-types */

import React from 'react';

import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import Drawer from 'material-ui/Drawer';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';

import isArray from 'lodash/isArray';

import {
  createAction,
  createReducer,
} from 'redux-act';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import routes from '../utils/routes';
import theme from '../utils/theme';

const NavigationDrawer = ({ closeDrawer, changeView, drawerOpened, path, user }) => (
  <Drawer
    open={drawerOpened}
    onRequestClose={() => closeDrawer()}
  >

    <AppBar
      style={{ position: 'relative' }}
    >
      <Toolbar>
        <IconButton
          contrast
          onClick={() => closeDrawer()}
        >
          menu
        </IconButton>
        <Text
          style={{ flex: 1 }}
          type="title"
          colorInherit
        >
          <FormattedMessage id="navigation" />
        </Text>
      </Toolbar>
    </AppBar>

    <List>
      {
        routes.map((route) => {
          let active = (path === route.path);

          if (route.path === routes[0].path && path === '/') {
            active = true;
          }

          const scope = user ? user.scope : null;

          if (isArray(route.hideWhenScope) && route.hideWhenScope.includes(scope)) {
            return null;
          }

          return (
            <div key={route.path}>
              <ListItem
                button
                divider={route.separator}
                onClick={() => { changeView(route.path); }}
              >
                <ListItemIcon
                  style={active ? { color: theme.palette.primary[500] } : null}
                >
                  <Icon>{route.icon}</Icon>
                </ListItemIcon>

                <ListItemText
                  style={active ? { color: theme.palette.primary[500] } : null}
                  primary={<FormattedMessage id={route.name} />}
                />
              </ListItem>
            </div>
          );
        })
      }
    </List>
  </Drawer>
);

NavigationDrawer.defaultProps = {
  user: null,
};

// Action creators
export const closeDrawer = createAction('Close menu drawer');
export const openDrawer = createAction('Open menu drawer');
export const toggleDrawer = createAction('Toggle menu drawer');

// Initial state
const initialState = {
  drawerOpened: false,
};

// Reducer
export const reducer = createReducer({
  [closeDrawer]: state => ({
    ...state,
    drawerOpened: false,
  }),
  [openDrawer]: state => ({
    ...state,
    drawerOpened: true,
  }),
  [toggleDrawer]: state => ({
    ...state,
    drawerOpened: !state.drawerOpened,
  }),
}, initialState);

export default withRouter(connect(
  (state, ownProps) => ({
    drawerOpened: state.drawer.drawerOpened,
    path: ownProps.location.pathname,
    user: state.auth.data.token && jwtDecode(state.auth.data.token),
  }),
  (dispatch, ownProps) => ({
    changeView(view) {
      dispatch(closeDrawer());
      ownProps.push(view.toLowerCase());
    },
    closeDrawer() {
      dispatch(toggleDrawer());
    },
  }),
)(NavigationDrawer));

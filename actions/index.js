import setWaypoint from '../actions/setWaypoint';
import getDistance from '../actions/getDistance';
import getCurrentLocation from '../actions/getCurrentLocation';
import setOriginPoint from '../actions/setOriginPoint';
import setDestinationPoint from '../actions/setDestinationPoint';
import clearWaypoints from '../actions/clearWaypoints';
import clearMainPoints from '../actions/clearMainPoints';
import addWaypointInput from '../actions/addWaypointInput';
import deleteWaypointInput from '../actions/deleteWaypointInput'
import setApiKey from '../actions/setApiKey'
import getApiKey from '../actions/getApiKey'

const actions = {
  setWaypoint,
  getDistance,
  getCurrentLocation,
  setOriginPoint,
  setDestinationPoint,
  clearWaypoints,
  clearMainPoints,
  addWaypointInput,
  deleteWaypointInput,
  setApiKey,
  getApiKey
};

module.exports = actions;
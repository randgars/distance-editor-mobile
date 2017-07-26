import setWaypoint from '../actions/setWaypoint';
import getDistance from '../actions/getDistance';
import getCurrentLocation from '../actions/getCurrentLocation';
import setOriginPoint from '../actions/setOriginPoint';
import setDestinationPoint from '../actions/setDestinationPoint';
import clearWaypoints from '../actions/clearWaypoints';
import clearMainPoints from '../actions/clearMainPoints';

const actions = {
  setWaypoint,
  getDistance,
  getCurrentLocation,
  setOriginPoint,
  setDestinationPoint,
  clearWaypoints,
  clearMainPoints
};

module.exports = actions;
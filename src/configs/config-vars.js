import multi from "../multi";

const host = multi.host;

const myconf = {
  api: multi.api,
  pinpad: multi.pinpad,
  legacy: multi.legacy,
  apikey: multi.apikey,
  geo: 'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&sensor=true&key={key}',
  geokey: multi.geokey,
  scss: multi.scss,
  host
}
export default Object.assign({}, myconf);
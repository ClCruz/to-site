const domains = require('./jsons/domains.json');

let json = {};
const domain = domains[window.location.hostname];
const jsonName = `./jsons/${domain}.json`;

json = require(`./jsons/${domain}.json`);

// if (json.env === 'dev') {
//   require(`@/scss/themes/${json.template}/main.scss`);
// }

// console.log(`${json.uri}/assets/css/${json.template}/main.css`);
// require(`${json.uri}/assets/css/${json.template}/main.css`);

export default Object.assign({}, json);

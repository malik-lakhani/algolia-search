const algoliasearch = require('algoliasearch');
const Promise = require('bluebird');

var client = algoliasearch(process.env.APPLICATION_ID, process.env.ADMIN_API_KEY);
var index = client.initIndex(process.env.INDEX);

Promise.promisifyAll(index);

module.exports = {

  /*
  ==================================================================================================

    Add Users to algolia users_demo index.

  ==================================================================================================
  */

  addUser: function(req, res) {
    const users = req.body.users;

    index.addObjectsAsync(users)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },

  /*
  ==================================================================================================

    list all adult users.

  ==================================================================================================
  */

  getAdultResults: function(req, res) {
    const gender = req.query.gender || "";

    const searchByGender = gender ? ` AND gender: ${gender}` : ''
    index.searchAsync({
      filters: `age>=18 AND age<=58`.concat(searchByGender) // https://www.algolia.com/doc/api-reference/api-parameters/filters/
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },

  /*
  ==================================================================================================

    list all users of given gender.

  ==================================================================================================
  */

  getListByGender: function(req, res) {
    const gender = req.query.gender;
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;

    index.searchAsync({
      filters: `gender:${gender}`, // https://www.algolia.com/doc/api-reference/api-parameters/filters/
      hitsPerPage: limit,
      page: page
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },

  /*
  ==================================================================================================

    list all users by given filter.

  ==================================================================================================
  */

  getUsersListByFilter: function(req, res) {
    const packet = req.query;
    let filters = [];
    let numericFilters = [];

    if (packet.gender) {
      filters.push(`gender: ${packet.gender}`)
    }
    if (packet.states) {
      let statesArray = packet.states.split('|')
      if (statesArray.length > 1) {
        let statesArrayFilters = statesArray.map(state => `state: ${state}`)
        filters.push(statesArrayFilters);
      } else {
        filters.push(`state: ${statesArray[0]}`)
      }
    }

    if (packet.is_adult === 'true') {
      numericFilters.push(`age >= ${18}`)
      numericFilters.push(`age <= ${58}`)
    }

    console.log(filters)

    index.searchAsync({
      query: packet.name || "",
      facetFilters: filters, // https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
      numericFilters: numericFilters, // https://www.algolia.com/doc/api-reference/api-parameters/numericFilters/
      restrictSearchableAttributes: [
        'name'
      ]
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  }
}
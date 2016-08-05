var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  getUserInfo: getUserInfo,
  createUser: createUser,
  getPhone: getPhone
}

function getUserInfo (rego) {
  return knex('cars')
          .join('profiles', 'cars.user_id','=', 'profiles.user_id')
          .where('rego', rego)
}

function createUser (name, phone, location, rego) {
  return knex('users')
    .insert({})
    .then(function (id) {
      return knex('profiles')
        .insert({name: name, phone: phone, location: location, user_id: id[0]})
    })
    .then(function (id){
      return knex('profiles')
        .select('user_id')
        .where('id', id[0])
    })
    .then(function (data) {
      return knex('cars')
      .insert({rego: rego, user_id: data[0].user_id})
    })
    .then(function(id){
      return knex('cars')
        .select('rego')
        .where('id', id[0])
    })
    .catch(function (err) {
      console.log(err)
    })
}

function getPhone (id) {
  return knex('profiles')
    .select('phone')
    .where('user_id', id)
}

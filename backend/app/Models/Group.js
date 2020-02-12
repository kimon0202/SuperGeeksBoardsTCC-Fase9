'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
  user () {
    return this.belongsTo('App/Models/User');
  }

  board () {
    return this.belongsTo('App/Models/Board');
  }

  entries () {
    return this.hasMany('App/Models/Entry')
  }
}

module.exports = Group

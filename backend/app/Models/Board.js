'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Board extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  groups () {
    return this.hasMany('App/Models/Group');
  }

  image () {
    return this.hasOne('App/Models/Image');
  }
}

module.exports = Board

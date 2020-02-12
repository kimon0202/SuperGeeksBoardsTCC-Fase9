'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with groups
 */

const Group = use('App/Models/Group');
const Board = use('App/Models/Board');

class GroupController {
  /**
   * Show a list of all groups.
   * GET groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth, params }) {
    const {page, limit} = request.get();

    const groups = await Group
      .query()
      .where('user_id', auth.user.id)
      .where('board_id', params.board_id)
      .with('entries')
      .paginate(page, limit);
    return groups;
  }

  /**
   * Create/save a new group.
   * POST groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params, auth }) {
    const data = request.only(['name']);

    const board = await Board.findOrFail(params.board_id);

    if(auth.user.id !== board.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    const group = await Group.create({
      user_id: auth.user.id,
      board_id: params.board_id,
      ...data,
    });

    return group;
  }

  /**
   * Display a single group.
   * GET groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    const group = await Group.findOrFail(params.id);

    if(auth.user.id !== group.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    return group;
  }

  /**
   * Delete a group with id.
   * DELETE groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const group = await Group.findOrFail(params.id);

    if(auth.user.id !== group.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    await group.delete();
  }
}

module.exports = GroupController

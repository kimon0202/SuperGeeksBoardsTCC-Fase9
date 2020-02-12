'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with boards
 */

const Board = use('App/Models/Board');

class BoardController {
  /**
   * Show a list of all boards.
   * GET boards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const {page, limit} = request.get();

    const boards = await Board
      .query()
      .where('user_id', auth.user.id)
      .with('image')
      .paginate(page, limit);

    return boards;
  }

  /**
   * Create/save a new board.
   * POST boards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['name']);
    const board = await Board.create({
      user_id: auth.user.id,
      ...data,
    });

    return board;
  }

  /**
   * Display a single board.
   * GET boards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    const board = await Board.findOrFail(params.id);

    if(auth.user.id !== board.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    await board.load('groups.entries');

    return board;
  }

  /**
   * Delete a board with id.
   * DELETE boards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const board = await Board.findOrFail(params.id);

    if(board.user_id !== auth.user.id) {
      return response.unauthorized({message: 'Login First'});
    }

    await board.delete();
  }
}

module.exports = BoardController

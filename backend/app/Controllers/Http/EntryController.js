'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Entry = use('App/Models/Entry');
const Group = use('App/Models/Group');

/**
 * Resourceful controller for interacting with entries
 */
class EntryController {
  /**
   * Show a list of all entries.
   * GET entries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, params }) {
    const {page, limit} = request.get();

    const entries = Entry
      .query()
      .where('board_id', params.board_id)
      .where('group_id', params.group_id)
      .paginate(page, limit);
    return entries;
  }

  /**
   * Create/save a new entry.
   * POST entries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    const data = request.only(['content']);

    const group = await Group.findOrFail(params.group_id);

    if(auth.user.id !== group.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    const entry = await Entry.create({
      user_id: auth.user.id,
      board_id: params.board_id,
      group_id: params.group_id,
      ...data
    });

    return entry;
  }

  /**
   * Update entry details.
   * PUT or PATCH entries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const entry = await Entry.findOrFail(params.id);

    // if(auth.user.id !== entry.user_id) {
    //   return response.unauthorized({message: 'Login First'});
    // }

    const data = request.only(['group_id']);
    entry.merge(data);

    await entry.save();
    return entry;
  }

  /**
   * Delete a entry with id.
   * DELETE entries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const entry = await Entry.findOrFail(params.id);

    if(auth.user.id !== entry.user_id) {
      return response.unauthorized({message: 'Login First'});
    }

    await entry.delete();
  }
}

module.exports = EntryController

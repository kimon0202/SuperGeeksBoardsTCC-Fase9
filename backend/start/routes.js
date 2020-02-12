'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'SessionController.login');
Route.post('/users', 'UserController.store');

Route.post('/boards/:id/image', 'ImageController.store')
  .middleware(['auth'])
Route.get('/images/:path', 'ImageController.show')

Route.resource('boards', 'BoardController')
    .apiOnly()
    .except(['update', 'destroy'])
    .middleware(['auth'])

Route.group(() => {
  Route.resource('groups', 'GroupController')
    .apiOnly()
    .except(['update', 'destroy'])
    .middleware(['auth'])
}).prefix('/boards/:board_id');

Route.group(() => {
  Route.resource('entries', 'EntryController')
    .apiOnly()
    .except(['show', 'destroy'])
    .middleware(['auth'])
}).prefix('/boards/:board_id/groups/:group_id');

Route.group(() => {
  Route.delete('/boards/:id', 'BoardController.destroy')
  Route.delete('/groups/:id', 'GroupController.destroy')
  Route.delete('/entries/:id', 'EntryController.destroy')
}).middleware(['auth']);

// Route.group(() => {

// }).prefix('/users/:user_id');

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



Route.group(() =>{
  Route.post('registrar/personas', 'PersonaController.create')
  Route.get('mostrar/personas/:id?', 'PersonaController.index').middleware(['buscarPersona'])
  Route.put('actualizar/personas/:id', 'PersonaController.update').middleware(['buscarPersona'])
  Route.delete('eliminar/personas/:id', 'PersonaController.delete').middleware(['buscarPersona'])
}).prefix('api');

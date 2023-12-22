/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

const favoritos = [{ id: 1, nome: 'Google', url: 'http://www.google.com', importante: true }]

Route.get('/', async () => {
  return { app: 'favio-back' }
})

Route.get('/favoritos', async () => {
  return favoritos
})

Route.get('/favoritos/:id', async ({ params, response}) => {
  //retornar o objeto caso exista, senão retornar o objeto vazio {}
  //função callback
  let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)

  if favoritoEncontrado == undefined
  return response.status(404)

  return favoritoEncontrado
})

Route.get('/favoritos/:nome', async ({ params }) => {
  return {id:1, nome: params.nome, url: 'http://www.google.com', importante: true }
})

Route.post('/favoritos', async ({request, response})=>{
  const{nome,url,importante} = request.body()
  const newFavorito = {id:favoritos.length+1,nome,url,importante}
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})
//Rota post para criar um novo favorito



Route.delete('/favoritos/:id', async ({response, params})=>{
  let favorito = favoritos.find((favorito) => favorito.id == params.id)
  console.log(favorito, "favorito encontrado!")
  if (favorito!=undefined) {
    const indice = favoritos.indexOf(favorito)
    favoritos.splice(indice)
    return response.status(200)
  } else {
    return response.status(404)
  }
})

Route.put('/favoritos/:id', async ({response, params, request}) =>{
  const{nome,url,importante} = request.body()
  let encontrado = favoritos.find((favorito) => favoritos.id == params.id)
  if (encontrado!=undefined){
    const indice = favoritos.indexOf(encontrado)
    if(nome != null) {
      favoritos[indice].nome = nome
    }
    if (url !=null) {
      favoritos[indice].url = url
    }
    if (importante !=null) {
      favoritos[indice].importante = importante
    }
    return response.status(200)
  } else {
    return response.status(404)
  }
})
Route.resource('favoritao', 'FavoritosController').apiOnly

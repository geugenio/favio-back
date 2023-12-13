import { test } from '@japa/runner'

test.group('Update favorito', () => {
  test('atualizar favorito', async ({ client }) => {
    const resposta = await client
      .delete('/favoritos/1')
      .json({ nome: 'orkut', url: 'www.orkut.com.br', importante: false })
    resposta.assertStatus(200)
  })

  test('atualizar favorito não existente', async ({ client }) => {
    const resposta = await client.delete('/favoritos/nonexist')
    resposta.assertStatus(404)
  })
})

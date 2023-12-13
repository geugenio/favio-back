import { test } from '@japa/runner'

test.group('Delete favorito', () => {
  test('deletar favorito', async ({ client }) => {
    const resposta = await client.delete('/favoritos/1')
    resposta.assertStatus(200)
  })
  test('deletar favorito', async ({ client }) => {
    const resposta = await client.delete('/favoritos/nonexist')
    resposta.assertStatus(404)
  })
})

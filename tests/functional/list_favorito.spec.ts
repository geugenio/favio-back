import { test } from '@japa/runner'

//criado através de node ace make: test functional list_favoritos
test.group('List favoritos', () => {
  test('exibir favoritos', async ({ client }) => {
    const resposta = await client.get('/favoritos')
    resposta.assertStatus(200)

    resposta.assertBodyContains([])
  })
  test('exibir favorito com id', async ({ client }) => {
    const resposta = await client.get('/favoritos/1')
    resposta.assertStatus(200)

    resposta.assertBodyContains({ nome: 'Google' })
  })
})

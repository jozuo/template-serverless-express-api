import app from '@/app'
import request from 'supertest'

// 'x-apigateway-event'と'x-apigateway-context'ヘッダが無いと
// コンソールエラーが出力されるのでその抑止のためSpy化する
let logSpy: jest.SpyInstance
beforeEach(() => {
  logSpy = jest.spyOn(console, 'error')
  logSpy.mockImplementation(log => log)
})
afterEach(() => {
  logSpy.mockRestore()
})

describe('getAll', () => {
  test('正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app).get('/users')
    // -- verify
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      { name: 'hoge', age: 25 },
      { name: 'fuga', age: 28 },
      { name: 'piyo', age: 27 },
    ])
  })
})
describe('get', () => {
  test('データが存在する場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app).get('/users/0/')
    // -- verify
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ name: 'hoge', age: 25 })
  })
  test('データが存在しない場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app).get('/users/4/')
    // -- verify
    expect(response.status).toBe(404)
    expect(response.body.name).toBe('HttpError')
    expect(response.body.message).toBe('User not found!')
  })
})
describe('post', () => {
  test('正しいレスポンスが返却されること', async () => {
    // -- setup
    const user = { name: 'luke', age: 14 }

    // -- exercise
    const response = await request(app)
      .post('/users')
      .send(user)
    // -- verify
    expect(response.status).toBe(201)
    expect(response.body).toEqual(user)
  })
})
describe('put', () => {
  // -- setup
  const user = { name: 'hoge', age: 26 }

  test('データが存在する場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app)
      .put('/users/0/')
      .send(user)
    // -- verify
    expect(response.status).toBe(200)
    expect(response.body).toEqual(user)
  })
  test('データが存在しない場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app)
      .put('/users/5/')
      .send(user)
    // -- verify
    expect(response.status).toBe(404)
    expect(response.body.name).toBe('HttpError')
    expect(response.body.message).toBe('User not found!')
  })
})
describe('delete', () => {
  test('データが存在する場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app).delete('/users/0/')
    // -- verify
    expect(response.status).toBe(200)
    expect(response.body).toEqual({})
  })
  test('データが存在しない場合、正しいレスポンスが返却されること', async () => {
    // -- exercise
    const response = await request(app).delete('/users/5/')
    // -- verify
    expect(response.status).toBe(404)
    expect(response.body.name).toBe('HttpError')
    expect(response.body.message).toBe('User not found!')
  })
})

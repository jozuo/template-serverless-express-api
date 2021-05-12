import { UserNotFoundError } from '@/errors/http/user-not-found'
import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
} from 'routing-controllers'

interface User {
  name: string
  age: number
}
const users: User[] = [
  { name: 'hoge', age: 25 },
  { name: 'fuga', age: 28 },
  { name: 'piyo', age: 27 },
]

@JsonController('/users')
export default class UserControllers {
  @Get('/')
  public getAll(): User[] {
    return users
  }

  @OnUndefined(UserNotFoundError)
  @Get('/:id')
  public get(@Param('id') id: number): User {
    return users[id]
  }

  @HttpCode(201)
  @Post('/')
  public post(@Body() user: User): User {
    users.push(user)
    return user
  }

  @Put('/:id')
  public put(@Param('id') id: number, @Body() user: User): User {
    if (users.length - 1 < id) {
      throw new UserNotFoundError()
    }
    users[id] = user
    return user
  }

  @Delete('/:id')
  public delete(@Param('id') id: number): {} {
    if (users.length - 1 < id) {
      throw new UserNotFoundError()
    }
    users.splice(id, 1)
    return {}
  }
}

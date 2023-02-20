import {
    Body, Controller, Post, Get, Put, Delete, Header, Param, Res,
    HttpCode, HttpException, ParseUUIDPipe
} from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto } from "../shared/models/user";
import { UsersService } from "./services/users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get('')
    public getUsers() {
        return this.service.getUsers();
    }

    @Get('/:id')
    public async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const user = await this.service.getUser(id);
        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createUser(@Body() dto: CreateUserDto) {
        return this.service.createUser(dto);
    }

    @Put('/:id')
    public async updatePassword(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: UpdatePasswordDto
    ) {
        return this.service.updatePassword(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const user = await this.service.deleteUser(id);
        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', 404);
        }
    }
}
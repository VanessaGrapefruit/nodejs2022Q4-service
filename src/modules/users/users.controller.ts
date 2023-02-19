import {
    Body, Controller, Post, Get, Put, Delete, Header, Param, Res,
    HttpCode, HttpException, ParseUUIDPipe, UseInterceptors
} from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto } from "../shared/models/user";
import { DB } from "../shared/services/db.service";
import { ExludePasswordInterceptor } from "./services/exclude-password.interceptor";

@Controller('user')
@UseInterceptors(ExludePasswordInterceptor)
export class UsersController {
    constructor(private readonly db: DB) {}

    @Get('')
    public getUsers() {
        return this.db.users.findMany();
    }

    @Get('/:id')
    public async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const user = await this.db.users.findOne({ key: 'id', equals: id });
        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createUser(@Body() dto: CreateUserDto) {
        return this.db.users.create(dto);
    }

    @Put('/:id')
    public async updatePassword(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: UpdatePasswordDto
    ) {
        const user = await this.db.users.findOne({ key: 'id', equals: id });
        if (!user) {
            throw new HttpException('User not found', 404);
        }

        if (user.password !== dto.oldPassword) {
            throw new HttpException('Access forbidden: password don\'t match', 403);
        }

        return this.db.users.change(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const user = await this.db.users.delete(id);
        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', 404);
        }
    }
}
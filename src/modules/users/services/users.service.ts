import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserWithoutPassword } from 'src/modules/shared/models/user';
import { PrismaService } from 'src/modules/shared/services/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private readonly userSelectAttributes: Record<keyof UserWithoutPassword, boolean> = {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true
    }

    public getUsers() {
        return this.prisma.user.findMany({
            select: this.userSelectAttributes
        });
    }

    public getUser(id: string) {
        return this.prisma.user.findFirst({
            where: { id },
            select: this.userSelectAttributes
        });
    }

    public createUser(dto: CreateUserDto) {
        return this.prisma.user.create({
            data: dto,
            select: this.userSelectAttributes
        });
    }

    public async updatePassword(id: string, dto: UpdatePasswordDto) {
        const user = await this.prisma.user.findFirst({
            where: { id }
        });
        if (!user) {
            throw new HttpException('User not found', 404);
        }

        if (user.password !== dto.oldPassword) {
            throw new HttpException('Access forbidden: password don\'t match', 403);
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                version: user.version + 1,
                updatedAt: new Date(),
                password: dto.newPassword
            },
            select: this.userSelectAttributes
        });
    }

    public deleteUser(id: string) {
        return this.prisma.user.delete({
            where: { id },
            select: this.userSelectAttributes
        });
    }
}
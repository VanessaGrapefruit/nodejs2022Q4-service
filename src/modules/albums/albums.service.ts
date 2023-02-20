import { Injectable } from "@nestjs/common";
import { CreateAlbumDto } from "../shared/models/album";
import { PrismaService } from "../shared/services/prisma.service";

@Injectable()
export class AlbumsService {
    constructor(private readonly prisma: PrismaService) {}

    public getAlbums() {
        return this.prisma.album.findMany();
    }

    public getAlbum(id: string) {
        return this.prisma.album.findFirst({
            where: { id }
        });
    }

    public createAlbum(dto: CreateAlbumDto) {
        return this.prisma.album.create({
            data: dto
        });
    }

    public updateAlbum(id: string, dto: CreateAlbumDto) {
        return this.prisma.album.update({
            where: { id },
            data: dto
        });
    }

    public async deleteAlbum(id: string) {
        const album = await this.prisma.album.findFirst({
            where: { id }
        });
        if (album) {
            return this.prisma.album.delete({
                where: { id }
            })
        }
    }
}
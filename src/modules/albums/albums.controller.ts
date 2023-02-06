import { Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe, HttpException, Body, HttpCode } from '@nestjs/common';
import { CreateAlbumDto } from '../shared/models/album';
import { DB } from '../shared/services/db.service';

@Controller('album')
export class AlbumsController {
    constructor(private readonly db: DB) {}

    @Get('')
    public getAlbums() {
        return this.db.albums.findMany();
    }

    @Get('/:id')
    public async getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const album = await this.db.albums.findOne({ key: 'id', equals: id });
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createAlbum(@Body() dto: CreateAlbumDto) {
        return this.db.albums.create(dto);
    }

    @Put('/:id')
    public async updateAlbum(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: CreateAlbumDto
    ) {
        const album = await this.db.albums.change(id, dto);
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const album = await this.db.albums.delete(id);
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }
}
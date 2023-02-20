import { Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe, HttpException, Body, HttpCode } from '@nestjs/common';
import { CreateAlbumDto } from '../shared/models/album';
import { DB } from '../shared/services/db.service';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
    constructor(private readonly service: AlbumsService) {}

    @Get('')
    public getAlbums() {
        return this.service.getAlbums();
    }

    @Get('/:id')
    public async getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const album = await this.service.getAlbum(id);
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createAlbum(@Body() dto: CreateAlbumDto) {
        return this.service.createAlbum(dto);
    }

    @Put('/:id')
    public async updateAlbum(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: CreateAlbumDto
    ) {
        const album = await this.service.updateAlbum(id, dto);
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const album = await this.service.deleteAlbum(id);
        if (album) {
            return album;
        } else {
            throw new HttpException('Album not found', 404);
        }
    }
}
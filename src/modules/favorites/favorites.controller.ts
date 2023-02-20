import { Controller, Get, Post, Delete, Param, HttpCode, HttpException, ParseUUIDPipe } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Controller('favs')
export class FavoritesController {
    constructor(private readonly service: FavoritesService) {}

    @Get('')
    public getFavorites() {
        return this.service.getFavorites();
    }

    @Post('/track/:id')
    @HttpCode(201)
    public async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const result = await this.service.addFavorite(id, 'track');
        if (result) {
            return result;
        } else {
            throw new HttpException('Track not found', 422);
        }
    }

    @Delete('/track/:id')
    @HttpCode(204)
    public async deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = await this.service.deleteFavorite(id, 'track');
        if (!success) {
            throw new HttpException('Track not found', 404);
        }
    }

    @Post('/album/:id')
    @HttpCode(201)
    public async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const result = await this.service.addFavorite(id, 'album');
        if (result) {
            return result;
        } else {
            throw new HttpException('Album not found', 422);
        }
    }

    @Delete('/album/:id')
    @HttpCode(204)
    public async deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = await this.service.deleteFavorite(id, 'album');
        if (!success) {
            throw new HttpException('Album not found', 404);
        }
    }

    @Post('/artist/:id')
    @HttpCode(201)
    public async addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const result = await this.service.addFavorite(id, 'artist');
        if (result) {
            return result;
        } else {
            throw new HttpException('Artist not found', 422);
        }
    }

    @Delete('/artist/:id')
    @HttpCode(204)
    public async deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = await this.service.deleteFavorite(id, 'artist');
        if (!success) {
            throw new HttpException('Artist not found', 404);
        }
    }
}
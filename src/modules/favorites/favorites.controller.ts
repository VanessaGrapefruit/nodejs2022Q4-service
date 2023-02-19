import { Controller, Get, Post, Delete, Param, HttpCode, HttpException, ParseUUIDPipe } from "@nestjs/common";
import { DB } from "../shared/services/db.service";

@Controller('favs')
export class FavoritesController {
    constructor(private readonly db: DB) {}

    @Get('')
    public getFavorites() {
        return this.db.getFavorites();
    }

    @Post('/track/:id')
    @HttpCode(201)
    public async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const track = await this.db.tracks.findOne({ key: 'id', equals: id });
        if (track) {
            this.db.addFavorite(id, 'tracks');
        } else {
            throw new HttpException('Track not found', 422);
        }
    }

    @Delete('/track/:id')
    @HttpCode(204)
    public async deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = this.db.deleteFavorite(id, 'tracks');
        if (!success) {
            throw new HttpException('Track not found', 404);
        }
    }

    @Post('/album/:id')
    @HttpCode(201)
    public async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const album = await this.db.albums.findOne({ key: 'id', equals: id });
        if (album) {
            this.db.addFavorite(id, 'albums');
        } else {
            throw new HttpException('Album not found', 422);
        }
    }

    @Delete('/album/:id')
    @HttpCode(204)
    public async deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = this.db.deleteFavorite(id, 'albums');
        console.log('jopa', success);
        if (!success) {
            throw new HttpException('Album not found', 404);
        }
    }

    @Post('/artist/:id')
    @HttpCode(201)
    public async addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const artist = await this.db.artists.findOne({ key: 'id', equals: id });
        if (artist) {
            this.db.addFavorite(id, 'artists');
        } else {
            throw new HttpException('Artist not found', 422);
        }
    }

    @Delete('/artist/:id')
    @HttpCode(204)
    public async deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const success = this.db.deleteFavorite(id, 'artists');
        if (!success) {
            throw new HttpException('Artist not found', 404);
        }
    }
}
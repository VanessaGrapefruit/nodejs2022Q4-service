import { Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, Put, HttpCode } from "@nestjs/common";
import { CreateArtistDto } from "../shared/models/artist";
import { DB } from "../shared/services/db.service";
import { ArtistsService } from "./artists.service";

@Controller('artist')
export class ArtistsController {
    constructor(private readonly service: ArtistsService) {}

    @Get('')
    public getArtists() {
        return this.service.getArtists();
    }

    @Get('/:id')
    public async getArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const artist = await this.service.getArtist(id);
        if (artist) {
            return artist;
        } else {
            throw new HttpException('Artist not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createArtist(@Body() dto: CreateArtistDto) {
        return this.service.createArtist(dto);
    }

    @Put('/:id')
    public async updateArtist(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: CreateArtistDto
    ) {
        const changed = await this.service.updateArtist(id, dto);
        if (changed) {
            return changed;
        } else {
            throw new HttpException('Artist not found', 404);
        }
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const deleted = await this.service.deleteArtist(id);
        if (deleted) {
            return deleted;
        } else {
            throw new HttpException('Artist not found', 404);
        }
    }
}
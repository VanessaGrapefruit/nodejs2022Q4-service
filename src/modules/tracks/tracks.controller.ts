import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpException, ParseUUIDPipe } from "@nestjs/common";
import { CreateTrackDto } from "../shared/models/track";
import { DB } from "../shared/services/db.service";
import { TracksService } from "./tracks.service";

@Controller('track')
export class TracksController {
    constructor(private readonly service: TracksService) {}

    @Get('')
    public getTracks() {
        return this.service.getTracks();
    }

    @Get('/:id')
    public async getTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const track = await this.service.getTrack(id);
        if (track) {
            return track;
        } else {
            throw new HttpException('Track not found', 404);
        }
    }

    @Post('')
    @HttpCode(201)
    public createTrack(@Body() dto: CreateTrackDto) {
        return this.service.createTrack(dto);
    }

    @Put('/:id')
    public async updateTrack(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() dto: CreateTrackDto
    ) {
        const track = await this.service.updateTrack(id, dto);
        if (track) {
            return track;
        } else {
            throw new HttpException('Track not found', 404);
        }
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const track = await this.service.deleteTrack(id);
        if (track) {
            return track;
        } else {
            throw new HttpException('Track not found', 404);
        }
    }
}
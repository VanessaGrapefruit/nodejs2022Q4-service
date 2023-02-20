import { Injectable } from "@nestjs/common";
import { CreateArtistDto } from "../shared/models/artist";
import { PrismaService } from "../shared/services/prisma.service";

@Injectable()
export class ArtistsService {
    constructor(private readonly prisma: PrismaService) {}

    public getArtists() {
        return this.prisma.artist.findMany();
    }

    public getArtist(id: string) {
        return this.prisma.artist.findFirst({
            where: { id }
        });
    }

    public createArtist(dto: CreateArtistDto) {
        return this.prisma.artist.create({
            data: dto
        });
    }

    public updateArtist(id: string, dto: CreateArtistDto) {
        return this.prisma.artist.update({
            where: { id },
            data: dto
        });
    }

    public async deleteArtist(id: string) {
        const artist = await this.prisma.artist.findFirst({
            where: { id }
        });
        if (artist) {
            return this.prisma.artist.delete({
                where: { id }
            });
        }
    }
}
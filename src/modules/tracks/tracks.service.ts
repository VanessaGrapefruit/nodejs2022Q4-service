import { Injectable } from "@nestjs/common";
import { CreateTrackDto } from "../shared/models/track";
import { PrismaService } from "../shared/services/prisma.service";

@Injectable()
export class TracksService {
    constructor(private readonly prisma: PrismaService) {}

    public getTracks() {
        return this.prisma.track.findMany();
    }

    public getTrack(id: string) {
        return this.prisma.track.findFirst({
            where: { id }
        });
    }

    public createTrack(dto: CreateTrackDto) {
        return this.prisma.track.create({
            data: dto
        });
    }

    public updateTrack(id: string, dto: CreateTrackDto) {
        return this.prisma.track.update({
            where: { id },
            data: dto
        });
    }

    public async deleteTrack(id: string) {
        const track = await this.prisma.track.findFirst({
            where: { id }
        });
        if (track) {
            return this.prisma.track.delete({
                where: { id }
            });
        }
    }
}
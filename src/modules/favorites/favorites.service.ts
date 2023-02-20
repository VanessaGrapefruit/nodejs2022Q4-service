import { HttpException, Injectable } from "@nestjs/common";
import { FavoritesKind, FavoritesResponse } from "../shared/models/favorites";
import { PrismaService } from "../shared/services/prisma.service";

@Injectable()
export class FavoritesService {
    constructor(private readonly prisma: PrismaService) {}

    public async getFavorites(): Promise<FavoritesResponse> {
        const favorites = await this.prisma.favorite.findMany({
            select: { artistId: true, albumId: true, trackId: true }
        });

        const ids = favorites.reduce((result, item) => {
            if (item.artistId) {
                result.artistsIds.push(item.artistId);
            } else if (item.albumId) {
                result.albumsIds.push(item.albumId);
            } else if (item.trackId) {
                result.tracksIds.push(item.trackId);
            }
            return result;
        }, {
            artistsIds: [],
            albumsIds: [],
            tracksIds: []
        } as any);

        const getArgs = (arr: string[]) => ({
            where: {
                id: { in: arr }
            }
        })
        return {
            artists: await this.prisma.artist.findMany(getArgs(ids.artistsIds)),
            albums: await this.prisma.album.findMany(getArgs(ids.albumsIds)),
            tracks: await this.prisma.track.findMany(getArgs(ids.tracksIds))
        };
    }

    public async addFavorite(id: string, kind: FavoritesKind) {
        try {
            const entityExist = await this.isEntityExist(id, kind);
            if (entityExist) {
                const key = this.favoriteKindToColumnKey(kind);
                return this.prisma.favorite.create({
                    data: {
                        [key]: id
                    }
                });
            }
        } catch {
            throw new HttpException(`${kind} not found`, 404);
        }
    }

    public async deleteFavorite(id: string, kind: FavoritesKind) {
        const key = this.favoriteKindToColumnKey(kind);
        const favorite = await this.prisma.favorite.findFirst({
            where: { [key]: id }
        });

        if (favorite) {
            return this.prisma.favorite.deleteMany({
                where: { [key]: id }
            });
        }
    }

    private async isEntityExist(id: string, kind: FavoritesKind) {
        const args = { where: { id } };
        let entity;
        switch (kind) {
            case 'album':
                entity = await this.prisma.album.findFirst(args);
                break;
            case 'artist':
                entity = await this.prisma.artist.findFirst(args);
                break;
            case 'track':
                entity = await this.prisma.track.findFirst(args);
                break;
        }
        return !!entity;
    }

    private favoriteKindToColumnKey(kind: FavoritesKind) {
        switch (kind) {
            case 'album':
                return 'albumId';
            case 'artist':
                return 'artistId';
            case 'track':
                return 'trackId';
        }
    }
}
import { Injectable } from '@nestjs/common';
import DBArtists from '../utils/DBArtists';
import DBUsers from '../utils/DBUsers';
import DBAlbums from '../utils/DBAlbums';
import DBTracks from '../utils/DBTracks';
import { FavoritesEntity, FavoritesKind, FavoritesResponse } from '../models/favorites';
import { CreateTrackDto, TrackDto } from '../models/track';

@Injectable()
export class DB {
    public users = new DBUsers();
    public artists = new DBArtists();
    public albums = new DBAlbums();
    public tracks = new DBTracks();

    private favorites: FavoritesEntity = new FavoritesEntity();

    constructor() {
        this.initSubscriptions();
    }

    public async getFavorites(): Promise<FavoritesResponse> {
        return {
            artists: await this.artists.findMany({ key: 'id', equalsAnyOf: this.favorites.artists }),
            albums: await this.albums.findMany({ key: 'id', equalsAnyOf: this.favorites.albums }),
            tracks: await this.tracks.findMany({ key: 'id', equalsAnyOf: this.favorites.tracks }),
        }
    }

    public addFavorite(id: string, kind: FavoritesKind): void {
        this.favorites[kind].push(id);
    }

    public deleteFavorite(id: string, kind: FavoritesKind): boolean {
        const index = this.favorites[kind].findIndex(item => item === id);
        if (index === -1) return false;

        this.favorites[kind].splice(index, 1);
        return true;
    }

    private initSubscriptions(): void {
        this.artists.onDelete$.subscribe(async (deleted) => {
            const tracks = await this.tracks.findMany({ key: 'artistId', equals: deleted.id });
            await Promise.all(tracks.map(track => {
                const { id, ...changed }: TrackDto = { ...track, artistId: null };
                return this.tracks.change(track.id, changed);
            }));
        });
        this.albums.onDelete$.subscribe(async (deleted) => {
            const tracks = await this.tracks.findMany({ key: 'albumId', equals: deleted.id });
            await Promise.all(tracks.map(track => {
                const { id, ...changed }: TrackDto = { ...track, albumId: null };
                return this.tracks.change(track.id, changed);
            }));
        });
    }
}
import { AlbumDto } from "./album";
import { ArtistDto } from "./artist";
import { TrackDto } from "./track";

export interface FavoritesResponse {
    artists: ArtistDto[]; // favorite artists ids
    albums: AlbumDto[]; // favorite albums ids
    tracks: TrackDto[]; // favorite tracks ids
}

export interface IFavoritesEntity {
    artists: string[];
    albums: string[];
    tracks: string[];
}

//export type FavoritesKind = keyof IFavoritesEntity;
export type FavoritesKind = 'artist' | 'album' | 'track';

export class FavoritesEntity implements IFavoritesEntity {
    artists: string[] = [];
    albums: string[] = [];
    tracks: string[] = [];

    public has(id: string, kind: FavoritesKind): boolean {
        return this[kind].includes(id);
    }
}
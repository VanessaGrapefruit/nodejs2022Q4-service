import { IsNotEmpty, IsNumber } from "class-validator";

export interface AlbumDto {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export class CreateAlbumDto {
    @IsNotEmpty() public name: string;
    @IsNumber() public year: number;
    public artistId: string | null;
}
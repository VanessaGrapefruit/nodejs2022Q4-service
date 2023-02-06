import { IsNotEmpty, IsNumber } from "class-validator";

export interface TrackDto {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export class CreateTrackDto {
    @IsNotEmpty() public name: string;
    @IsNumber() public duration: number;
    public artistId: string | null;
    public albumId: string | null;
}
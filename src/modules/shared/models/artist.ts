import { IsNotEmpty, IsBoolean } from "class-validator";

export interface ArtistDto {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

export class CreateArtistDto {
    @IsNotEmpty() name: string;
    @IsBoolean() grammy: boolean;
}
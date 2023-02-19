import { Module } from "@nestjs/common";
import { AlbumsController } from "./albums.controller";

@Module({
    imports: [],
    controllers: [AlbumsController],
    providers: [],
})
export class AlbumsModule {}
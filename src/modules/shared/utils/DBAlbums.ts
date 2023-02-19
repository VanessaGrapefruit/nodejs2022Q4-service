import { DBEntity } from './DBEntity';
import { v4 } from 'uuid';
import { AlbumDto, CreateAlbumDto } from '../models/album';

export default class DBAlbums extends DBEntity<
  AlbumDto,
  CreateAlbumDto
> {
  async create(dto: CreateAlbumDto): Promise<AlbumDto> {
    const created: AlbumDto = {
      ...dto,
      id: v4(),
    };
    this.entities.push(created);
    this.onCreate$.next(created);
    return created
  }
}

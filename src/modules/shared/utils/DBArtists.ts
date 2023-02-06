import { CreateUserDto, UpdatePasswordDto, UserDTO } from '../models/user';
import { DBEntity } from './DBEntity';
import { v4 } from 'uuid';
import { ArtistDto, CreateArtistDto } from '../models/artist';


export default class DbArtists extends DBEntity<
  ArtistDto,
  CreateArtistDto
> {

  async create(dto: CreateArtistDto): Promise<ArtistDto> {
    const created: ArtistDto = {
      ...dto,
      id: v4()
    };
    this.entities.push(created);
    this.onCreate$.next(created);
    return created
  }
}

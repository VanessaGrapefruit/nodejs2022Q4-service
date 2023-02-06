import { CreateUserDto, UpdatePasswordDto, UserDTO } from '../models/user';
import { DBEntity } from './DBEntity';
import { v4 } from 'uuid';
import { CreateTrackDto, TrackDto } from '../models/track';

export default class DBUsers extends DBEntity<
  TrackDto,
  CreateTrackDto
> {
  async create(dto: CreateTrackDto): Promise<TrackDto> {
    const created: TrackDto = {
      ...dto,
      id: v4(),
    };
    this.entities.push(created);
    return created
  }

  async change(id: string, changeDTO: CreateTrackDto): Promise<TrackDto | null> {
    const idx = this.entities.findIndex(o => o.id === id);
    if (idx === -1) return null;

    const changed: TrackDto = {
        ...this.entities[idx],
        ...changeDTO
    };
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}

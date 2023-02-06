import { CreateUserDto, UpdatePasswordDto, UserDTO } from '../models/user';
import { DBEntity, NoRequiredEntity } from './DBEntity';
import { v4 } from 'uuid';

export default class DBUsers extends DBEntity<
  UserDTO,
  UpdatePasswordDto,
  CreateUserDto
> {
  async create(dto: CreateUserDto): Promise<UserDTO> {
    const datetime = new Date().getTime();
    const created: UserDTO = {
      ...dto,
      id: v4(),
      version: 1,
      createdAt: datetime,
      updatedAt: datetime
    };
    this.entities.push(created);
    return created
  }

  async change(id: string, changeDTO: UpdatePasswordDto): Promise<UserDTO | null> {
    const idx = this.entities.findIndex(o => o.id === id);
    if (idx === -1) return null;

    const entity = this.entities[idx];
    const changed: UserDTO = {
        ...entity,
        password: changeDTO.newPassword,
        version: entity.version + 1,
        updatedAt: new Date().getTime()
    };
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}

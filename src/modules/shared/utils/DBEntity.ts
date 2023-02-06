import * as lodash from 'lodash';
import { Subject } from 'rxjs';

type UnpackArray<T> = T extends (infer R)[] ? R : never;

export class NoRequiredEntity extends Error {
    constructor(operation: string) {
      super(`Fail during ${operation}.`);
      this.name = 'No required entity';
    }
  }

export abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO = ChangeDTO
> {
  protected entities: Entity[] = [];

  public onCreate$: Subject<Entity> = new Subject<Entity>();
  public onUpdate$: Subject<Entity> = new Subject<Entity>();
  public onDelete$: Subject<Entity> = new Subject<Entity>(); 

  abstract create(createDto: CreateDTO): Promise<Entity>;

  async findOne<K extends keyof Entity>(options: {
    key: K;
    equals: Entity[K];
  }): Promise<Entity | null> {
    return this.entities.find((o) => lodash.isEqual(o[options.key], options.equals)) ?? null;
  }

  async findMany<K extends keyof Entity>(options: {
    key: K;
    equals: Entity[K];
  }): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(option: {
    key: K;
    equalsAnyOf: Entity[K][];
  }): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(option: {
    key: K;
    inArray: UnpackArray<Entity[K]>;
  }): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(options?: {
    key: K;
    equals?: Entity[K];
    equalsAnyOf?: Entity[K][];
    inArray?: UnpackArray<Entity[K]>;
  }): Promise<Entity[]> {
    if (options?.equals) {
      return this.entities.filter((o) =>
        lodash.isEqual(o[options.key], options.equals)
      );
    }
    if (options?.equalsAnyOf) {
      return this.entities.filter((o) => {
        return options.equalsAnyOf?.some((value) =>
          lodash.isEqual(o[options.key], value)
        );
      });
    }
    if (options?.inArray) {
      return this.entities.filter((o) => {
        const array = o[options.key] as unknown as typeof options.inArray[];
        return array.some((value) => lodash.isEqual(value, options.inArray));
      });
    }
    return this.entities;
  }

  async delete(id: string): Promise<Entity | null> {
    const idx = this.entities.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    const deleted = this.entities[idx];
    this.entities.splice(idx, 1);
    this.onDelete$.next(deleted);
    return deleted
  }

  async change(id: string, changeDTO: ChangeDTO): Promise<Entity | null> {
    const idx = this.entities.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    const changed = { ...this.entities[idx], ...changeDTO };
    this.entities.splice(idx, 1, changed);
    this.onUpdate$.next(changed);
    return changed;
  }
}

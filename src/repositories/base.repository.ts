export class BaseRepository<EntityType, EntityIdType> {
    private entities: EntityType[];

    constructor(entities: EntityType[]) {
        this.entities = entities;
    }

    create(entity: EntityType): EntityType {
        this.entities.push(entity);
        return entity;
    }

    getById(id: EntityIdType): EntityType {
        return this.entities.find((entity: any) => entity.id === id);
    }

    update(id: string, newEntity: EntityType): EntityType {
        const oldEntityIdx = this.entities.findIndex((entity: any) => entity.id === id);
        if(oldEntityIdx !== -1){
            this.entities[oldEntityIdx] = newEntity;
            return newEntity;
        }
    }

    delete(id: EntityIdType): void {
        this.entities = this.entities.filter((entity: any) => entity.id !== id);
    }

    getAll(): EntityType[] {
        return this.entities;
    }
}

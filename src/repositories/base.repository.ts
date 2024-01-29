import { Model } from "mongoose";

export class BaseRepository<EntityType, EntityIdType> {
    private EntityModel: Model<EntityType>;

    constructor(EntityModel: Model<EntityType>) {
        this.EntityModel = EntityModel;
    }

    async create(entity: EntityType) {
        return await this.EntityModel.create(entity);
    }

    async getById(id: EntityIdType) {
        return await this.EntityModel.findById(id).exec();
    }

    async update(id: EntityIdType, newEntity: EntityType) {
        return await this.EntityModel.replaceOne({_id: id}, newEntity).exec();
    }

    async delete(id: EntityIdType) {
        await this.EntityModel.deleteOne({_id: id}).exec();
    }

    async getAll() {
        return await this.EntityModel.find({});
    }
}

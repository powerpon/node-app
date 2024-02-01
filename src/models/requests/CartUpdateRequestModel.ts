import Joi from "joi";

export interface CartUpdateRequestModel {
    productId: string;
    count: number;
}

export const cartUpdateRequestModel = Joi.object({
    productId: Joi.string().uuid().required(),
    count: Joi.number().min(1).required()
});

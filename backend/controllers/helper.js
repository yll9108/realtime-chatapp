import userModel from "../models/userModels";

export const createUser = (values) =>
    new userModel(values).save().then((user) => user.toObject());

export const getUserByEmail = () => userModel.findOne({ email });

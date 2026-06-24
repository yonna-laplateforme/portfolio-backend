import * as aboutModel from "../models/about.model.js";

export const getAboutContent = async () => await aboutModel.findAbout();
export const updateAboutContent = async (data) => await aboutModel.update(data);
export const updatePhotoUrl = async (url) => await aboutModel.updatePhotoUrl(url);



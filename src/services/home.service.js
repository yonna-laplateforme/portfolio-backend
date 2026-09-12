import * as homeModel from '../models/home.model.js';

export const getHomeContent = async () => await homeModel.findHome();
export const updateHomeContent = async (data) => await homeModel.update(data);
export const updateVideoUrl = async (url) => await homeModel.updateVideoUrl(url);
export const updatePosterUrl = async (url) => await homeModel.updatePosterUrl(url);
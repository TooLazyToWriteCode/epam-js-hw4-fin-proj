import lib from "axios";

/** @see https://github.com/axios/axios */
export const axios = lib.create({ baseURL: process.env.SERVER_URL });

export default axios;

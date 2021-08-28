/** @see https://stackoverflow.com/a/41946697 */

declare module "*.sass" {
    const sass: { [key: string]: string };
    export default sass;
}

declare module "*.scss" {
    const scss: { [key: string]: string };
    export default scss;
}

declare module "*.eot";
declare module "*.otf";
declare module "*.ttf";
declare module "*.woff";
declare module "*.woff2";

declare module "*.avif";
declare module "*.apng";
declare module "*.gif";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.webp";

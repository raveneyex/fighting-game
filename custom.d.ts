declare module "*.png" {
  const content: string;
  export = content;
}

declare module "*.css" {
  const content: any;
  export default content;
}

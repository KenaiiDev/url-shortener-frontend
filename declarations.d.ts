declare module "*.webp" {
  const value: any;
  export = value;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

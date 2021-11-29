export const makeApiUrl = (path: string): string =>
  `https://crudcrud.com/api/${process.env.REACT_APP_ENTITY}${path}`;

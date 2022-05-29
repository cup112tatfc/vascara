export type informationShoes = {
  model: 'string';
  type: 'string';
  heelStyle: 'string';
  toeStyle: 'string';
  heelHeight: 'string';
  material: 'string';
  pattern: 'string';
  suitable: 'string';
};
export type informationBag = {
  model: 'string';
  type: 'string';
  Dimensions: 'string';
  material: 'string';
  strap_material: 'string';
  lock_type: 'string';
  pattern: 'string';
  compartment: 'string';
  size: 'string';
  suitable: 'string';
};

export type informationBelt = {
  model: 'string';
  type: 'string';
  material: 'string';
  with: 'string';
  length: 'string';
};

export type informationGlass = {
  model: 'string';
  type: 'string';
  material: 'string';
  lenses: 'string';
  glasses: 'string';
  suitableFace: 'string';
};

type Product = {
  id: number | string;
  categoryId: number;
  name: string;
  color: string;
  type: string;
  heelStyle: string ;
  toeStyle: string ;
  strapType: string ;
  lockType: string ;
  sizes: Array<number | string>;
  price: number;
  total: number;
  imgurls: Array<string>;
  saleOff: boolean;
  priceOff: number;
  new: boolean;
  information: {
    model: 'string';
    type: 'string';
    heelStyle?: 'string';
    toeStyle?: 'string';
    heelHeight?: 'string';
    material?: 'string';
    pattern?: 'string';
    Dimensions?: 'string';
    strap_material?: 'string';
    lock_type?: 'string';
    compartment?: 'string';
    size?: 'string';
    with?: 'string';
    length?: 'string';
    lenses?: 'string';
    glasses?: 'string';
    suitableFace?: 'string';
    suitable?: 'string';
  };
};

export default Product;

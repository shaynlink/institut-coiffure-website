export type Service = {
  _id: string;
  category_id: string;
  name: string;
  price: number;
  duration: number;
  use_online_payment: boolean;
  price_settled_on_phone: boolean;
  extra_charge: boolean;
  price_variation?: boolean;
  description?: string;
}

export type Category = {
  _id: string;
  name: string;
  enVariant: string;
  active: boolean;
  services: Service[];
  services_count: number;
}

export type GetMethod<D = any> =
  [string, AxiosRequestConfig<D>]

export type Image = {
  image_id: number;
  business_id: number;
  tages: string[];
  staffers: any[];
  image: string;
  height: number;
  width: number;
  category: string;
  inspiration_categories: number[];
  order: number;
  visible: boolean;
  description: string;
  active: number;
  created: string;
  is_cover_photo: boolean;
  liked: boolean;
  likes_count: number;
  comments_count: number;
  meta: {
    score: null;
    id: string;
    sort: number[];
    item_no: number;
  },
  business: {
    cover_photo: string;
    name: string;
    id: number;
  },
}

export type Images = { images: Image[]} | { status: 'fail' };

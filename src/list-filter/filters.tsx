import { ColorType, PriceType, StyleType } from 'types/type.elementFiters';

export const PriceFilters: PriceType[] = [
  { id: 1, name: '< 400.000', arr_price: [0,400000] },
  { id: 2, name: '400.000 - 600.000', arr_price: [400000, 600000] },
  { id: 3, name: '600.000 - 900.000', arr_price: [600000, 900000] },
  { id: 4, name: '> 900.000', arr_price: [900000] },
];

export const ColorFilters: ColorType[] = [
  { id: 1, name: 'Đen', nameColor: 'black', link: 'black' },
  { id: 2, name: 'Xanh Blue', nameColor: 'blue', link: 'blue' },
  { id: 3, name: 'Xám', nameColor: 'grey', link: 'grey' },
  { id: 4, name: 'Hồng', nameColor: 'pink', link: 'pink' },
  { id: 5, name: 'Đỏ', nameColor: 'red', link: 'red' },
  { id: 6, name: 'Trắng', nameColor: 'white', link: 'white' },
  { id: 7, name: 'Xanh Green', nameColor: 'green', link: 'green' },
];

export const HeelStyle: StyleType[] = [
  { id: 1, name: 'Gót nhọn', pass_value: 'got_nhon' },
  { id: 2, name: 'Gót vuông', pass_value: 'got_vuong' },
  { id: 3, name: 'Đế xuồng', pass_value: 'de_xuong' },
  { id: 4, name: 'Đế bệt', pass_value: 'de_bet' },
];

export const ToeStyle: StyleType[] = [
  { id: 1, name: 'Bít mũi nhọn', pass_value: 'bit_mui_nhon' },
  { id: 2, name: 'Bít mũi tròn', pass_value: 'bit_mui_tron' },
  { id: 3, name: 'Bít mũi vuông', pass_value: 'bit_mui_vuong' },
  { id: 4, name: 'Hở mũi', pass_value: 'ho_mui' },
];

export const StrapType: StyleType[] = [
  { id: 1, name: 'Dây da', pass_value: 'day_da' },
  { id: 2, name: 'Dây Kim loại', pass_value: 'day_kim_loai' },
  { id: 3, name: 'Dây da phối kim loại', pass_value: 'day_da_phoi_kim_loai' },
];
export const KeyType: StyleType[] = [
  { id: 1, name: 'Khóa kéo', pass_value: 'khoa_keo' },
  { id: 2, name: 'Khóa cài', pass_value: 'khoa_cai' },
  { id: 3, name: 'Khóa bấm', pass_value: 'khoa_bam' },
  { id: 4, name: 'Dây rút', pass_value: 'day_rut' },
];

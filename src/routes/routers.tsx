import Login from 'pages/login/Login';
import Register from 'pages/register/Register';
import Home from 'pages/home/Home';
import { RouterType } from '../types/type.router';
import NewProducts from 'pages/new-products/NewProducts';
import PromotionalProducts from 'pages/promotional-products/PromotionalProducts';
import News from 'pages/News/News';
import PageNotFoundProps from 'pages/page-not-found/PageNotFound';
import ProductDetail from 'pages/product-detail/ProductDetail';
import ListProducts from 'pages/Page-list-products/ListProducts';
import Forgotpass from 'pages/forgotpass/Forgotpass';
import Cart from 'pages/cart/Cart';
import SearchPage from 'pages/search/Search';
import CheckoutPage from 'pages/checkout/Checkout';
const routes: RouterType[] = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/register',
    element: Register,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/forgotpass',
    element: Forgotpass,
  },
  {
    path: '/vascara-new-arrival',
    element: NewProducts,
  },

  {
    path: '/vascara-sale-off',
    element: PromotionalProducts,
  },
  {
    path: '/:nameListProducts',
    element: ListProducts,
  },
  {
    path: '/giay/:categoryId/:productId',
    element: ProductDetail,
  },
  {
    path: '/tui-xach/:categoryId/:productId',
    element: ProductDetail,
  },
  {
    path: '/balo/:categoryId/:productId',
    element: ProductDetail,
  },
  {
    path: '/phu-kien/:categoryId/:productId',
    element: ProductDetail,
  },
  {
    path: '/cart',
    element: Cart,
  },
  {
    path: 'cart/checkout',
    element: CheckoutPage,
  },
  {
    path: '/product/search',
    element: SearchPage,
  },

  {
    path: '/tin-tuc',
    element: News,
  },
  {
    path: '*',
    element: PageNotFoundProps,
  },
];
export default routes;

// Middleware
import auth from '@/middleware/auth';

// GeneralViews
import NotFound from '@/pages/NotFoundPage.vue';
import Login from '@/pages/LoginPage.vue';

// Pages DASHBOARD
import DashboardLayout from '@/layout/DashboardLayout.vue';

// Pages Auctions
import AuctionList from '@/pages/Auction/AuctionList.vue';
import AuctionCreate from '@/pages/Auction/AuctionCreate.vue';
import AuctionEdit from '@/pages/Auction/AuctionEdit.vue';
import AuctionGeneral from '@/pages/Auction/AuctionGeneral.vue';

// Pages PRODUCT
import ProductList from '@/pages/Product/ProductList.vue';
import ProductCreate from '@/pages/Product/ProductCreate.vue';
import ProductGeneral from '@/pages/Product/ProductGeneral.vue';

// Pages BIDBOT
import BidbotEdit from '@/pages/Bidbot/BidbotEdit.vue';
import BidbotGeneral from '@/pages/Bidbot/BidbotGeneral.vue';

// EXAMPLE PAGES
import TableList from '@/pages/TableList.vue';
import Icons from '@/pages/Icons.vue';
import Notifications from '@/pages/Notifications.vue';
import Upgrade from '@/pages/Upgrade.vue';

const routes = [
  // Login
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: auth,
  },
  // System
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/auctions',
    children: [
      // auctions
      {
        path: 'auctions',
        name: 'auctions',
        component: AuctionList,
        beforeEnter: auth,
      },
      {
        path: 'auction/',
        name: 'auction',
        redirect: { name: 'auction-general' },
        component: AuctionCreate,
        props: true,
        children: [
          {
            path: 'general/',
            name: 'auction-general',
            component: AuctionGeneral,
            beforeEnter: auth,
          }
        ]
      },
      {
        path: 'auction/:id',
        name: 'auction-edit',
        component: AuctionEdit,
        beforeEnter: auth
      },
      // products
      {
        path: 'products',
        name: 'products',
        component: ProductList,
        beforeEnter: auth,
      },
      {
        path: 'product/',
        name: 'product',
        redirect: { name: 'product-general' },
        component: ProductCreate,
        props: true,
        children: [
          {
            path: 'general/',
            name: 'product-general',
            component: ProductGeneral,
            beforeEnter: auth,
          }
        ]
      },

      
      // bidbot
      {
        path: 'bidbot/',
        name: 'bidbot',
        redirect: { name: 'bidbot-general' },
        component: BidbotEdit,
        props: true,
        children: [
          {
            path: 'general/',
            name: 'bidbot-general',
            component: BidbotGeneral,
            beforeEnter: auth,
          }
        ]
      }
    ]
  },
  // Not Found
  { path: '*', component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

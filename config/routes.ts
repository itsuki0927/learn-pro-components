export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/field',
        name: 'field',
        component: './field',
      },
      {
        path: '/form',
        name: 'form',
        routes: [
          {
            path: '/form/pro-form',
            name: 'pro-form',
            component: './form/pro-form',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

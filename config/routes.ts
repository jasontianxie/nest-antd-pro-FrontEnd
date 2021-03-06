export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/manageArticle',
    name: 'manageArticle',
    icon: 'form',
    access: 'canAdmin', // antd pro 权限管理：https://pro.ant.design/zh-CN/docs/authority-management
    routes: [
      {
        path: '/manageArticle/:id',
        component: './ManageArticle',
      },
      {
        component: './ManageArticle',
      },
    ],
  },
  {
    path: '/articleList',
    name: 'articleList',
    icon: 'table',
    routes: [
      {
        path: '/articleList/:id',
        component: './ArticleList',
      },
      {
        component: './ArticleList',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin', // antd pro 权限管理：https://pro.ant.design/zh-CN/docs/authority-management
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

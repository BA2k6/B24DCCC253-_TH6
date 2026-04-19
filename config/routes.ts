export default [
  // LOGIN
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  ///////////////////////////////////
  // MAIN MENU

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  // 🔥 TRAVEL PLANNER (MENU CHÍNH + 4 SUBMENU)
  {
    path: '/travel-planner',
    name: 'Travel Planner',
    icon: 'EnvironmentOutlined',
    routes: [
      {
        path: '/travel-planner',
        redirect: '/travel-planner/explore',
      },
      {
        path: '/travel-planner/explore',
        name: 'Khám phá',
        component: './TravelPlanner/Explore',
      },
      {
        path: '/travel-planner/trip',
        name: 'Lịch trình',
        component: './TravelPlanner/Trip',
      },
      {
        path: '/travel-planner/budget',
        name: 'Ngân sách',
        component: './TravelPlanner/Budget',
      },
      {
        path: '/travel-planner/dashboard',
        name: 'Thống kê',
        component: './TravelPlanner/Dashboard',
      },
    ],
  },

  ///////////////////////////////////
  // CÁC MENU CŨ (GIỮ NGUYÊN)

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/group-tasks',
    name: 'Quản lý công việc',
    component: './GroupTasks',
    icon: 'UnorderedListOutlined',
  },

  ///////////////////////////////////
  // HIDDEN ROUTES

  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },

  {
    path: '/notification',
    routes: [
      {
        path: './subscribe',
        component: './ThongBao/Subscribe',
      },
      {
        path: './check',
        component: './ThongBao/Check',
      },
      {
        path: './',
        component: './ThongBao/NotifOneSignal',
      },
    ],
    layout: false,
    hideInMenu: true,
  },

  ///////////////////////////////////
  // EXCEPTION

  {
    path: '/403',
    component: './exception/403/403Page',
    layout: false,
  },

  {
    path: '/hold-on',
    component: './exception/DangCapNhat',
    layout: false,
  },

  {
    component: './exception/404',
  },
];
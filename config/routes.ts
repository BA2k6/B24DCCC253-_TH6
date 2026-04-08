export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
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
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
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

	{
		path: '/doan-so',
		name: 'Bài 1: Đoán số',
		component: './DoanSo',
		icon: 'AimOutlined',
	},

	{
		path: '/todo-list',
		name: 'Bài 2: TodoList',
		component: './TodoList',
		icon: 'UnorderedListOutlined',
	},
	
	{
		path: '/travel-planner',
		name: 'Travel Planner',
		icon: 'CompassOutlined',
		routes: [
			{
				path: '/travel-planner/discover',
				name: 'Khám phá',
				component: './TravelPlanner/Home',
			},
			{
				path: '/travel-planner/itinerary',
				name: 'Lịch trình',
				component: './TravelPlanner/Itinerary',
			},
			{
				path: '/travel-planner/budget',
				name: 'Ngân sách',
				component: './TravelPlanner/Budget',
			},
			{
				path: '/travel-planner/admin',
				name: 'Quản trị',
				component: './TravelPlanner/Admin',
			},
			{
				path: '/travel-planner',
				redirect: '/travel-planner/discover',
			},
		],
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
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

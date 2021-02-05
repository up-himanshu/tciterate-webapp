export default function () {
	return [
		{
			title: 'Dashboard',
			to: '/dashboard',
			htmlBefore: '<i class="material-icons">dashboard</i>',
			htmlAfter: ''
		},
		// {
		// 	title: 'Sub-Admin ',
		// 	htmlBefore: '<i class="material-icons">people</i>',
		// 	to: '/sub-admins'
		// },
		{
			title: 'Testers',
			htmlBefore: '<i class="material-icons">people</i>',
			to: '/users'
		},
		{
			title: 'Projects',
			htmlBefore: '<i class="material-icons">group_work</i>',
			to: '/projects'
		}

		// {
		// 	title: 'Service Provider Management',
		// 	htmlBefore: '<i class="material-icons">people</i>',
		// 	to: '/providers'
		// },

		// {
		// 	title: 'Categories',
		// 	htmlBefore: '<i class="material-icons">category</i>',
		// 	to: '/categories'
		// },
		// {
		// 	title: 'Sub Categories',
		// 	htmlBefore: '<i class="material-icons">category</i>',
		// 	to: '/sub-categories'
		// },
		// {
		// 	title: 'Service Type',
		// 	htmlBefore: '<i class="material-icons">category</i>',
		// 	to: '/service-type'
		// },

		// {
		// 	title: 'Forms & Components',
		// 	htmlBefore: '<i class="material-icons">view_module</i>',
		// 	to: '/components-overview'
		// }
	];
}

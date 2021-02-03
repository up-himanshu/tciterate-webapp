import React from 'react';
import { Redirect } from 'react-router-dom';

// Layout Types
import { DefaultLayout, LoginLayout } from './layouts';

// Route Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';

import AdminProfile from './views/admin/profile';

import Categories from './views/Categories/list';
import AddCategories from './views/Categories/addEdit';
import CategoryDetails from './views/Categories/detail';

import SubCategories from './views/SubCategories/list';
import AddSubCategories from './views/SubCategories/addEdit';
import SubCategoryDetails from './views/SubCategories/detail';

import SubAdmins from './views/SubAdmin/list';
import AddSubAdmins from './views/SubAdmin/addEdit';
import SubAdminsDetails from './views/SubAdmin/details';

import Users from './views/Users/list';
import AddUser from './views/Users/addEdit';
import UserDetail from './views/Users/detail';

import Projects from './views/Projects/list';
import AddProject from './views/Projects/addEdit';
import ProjectDetail from './views/Projects/detail';

import Providers from './views/Providers/list';
import AddProvider from './views/Providers/addEdit';
import ProviderDetail from './views/Providers/detail';

import ServiceType from './views/ServiceType/list';
import AddEditServiceType from './views/ServiceType/addEdit';
import ServiceDetail from './views/ServiceType/detail';

//import ChildCategories from './views/SubCategories/list';
//import AddChildCategories from './views/SubCategories/addEdit';
//import ChildCategoryDetails from './views/SubCategories/detail';

import ErrNotFound from './views/ErrNotFound';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';

export default [
	{
		path: '/',
		exact: true,
		layout: DefaultLayout,
		component: localStorage.getItem('user') ? () => <Redirect to="/dashboard" /> : () => <Redirect to="/login" />
	},
	{
		path: '/login',
		layout: LoginLayout,
		component: Login
	},
	{
		path: '/dashboard',
		layout: DefaultLayout,
		component: Dashboard
	},
	{
		path: '/projects',
		exact: true,
		layout: DefaultLayout,
		component: Projects
	},
	{
		path: '/projects/new',
		exact: true,
		layout: DefaultLayout,
		component: AddProject
	},
	{
		path: '/projects/:id',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},
	{
		path: '/projects/:id/testcases',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},
	{
		path: '/projects/:id/testcases/new',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},
	{
		path: '/projects/:id/executions',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},
	{
		path: '/projects/:id/executions/new',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},
	{
		path: '/projects/:id/executions/:execution_id',
		exact: true,
		layout: DefaultLayout,
		component: ProjectDetail
	},

	{
		path: '/admin',
		layout: DefaultLayout,
		component: AdminProfile
	},
	{
		path: '/sub-admins',
		exact: true,
		layout: DefaultLayout,
		component: SubAdmins
	},
	{
		path: '/sub-admins/new',
		exact: true,
		layout: DefaultLayout,
		component: AddSubAdmins
	},
	{
		path: '/sub-admins/:id',
		exact: true,
		layout: DefaultLayout,
		component: SubAdminsDetails
	},
	{
		path: '/sub-admins/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddSubAdmins
	},
	{
		path: '/users',
		exact: true,
		layout: DefaultLayout,
		component: Users
	},
	{
		path: '/users/new',
		exact: true,
		layout: DefaultLayout,
		component: AddUser
	},
	{
		path: '/users/:id',
		exact: true,
		layout: DefaultLayout,
		component: UserDetail
	},
	{
		path: '/users/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddUser
	},
	{
		path: '/providers',
		exact: true,
		layout: DefaultLayout,
		component: Providers
	},
	{
		path: '/providers/new',
		exact: true,
		layout: DefaultLayout,
		component: AddProvider
	},
	{
		path: '/providers/:id',
		exact: true,
		layout: DefaultLayout,
		component: ProviderDetail
	},
	{
		path: '/providers/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddProvider
	},
	{
		path: '/categories',
		exact: true,
		layout: DefaultLayout,
		component: Categories
	},
	{
		path: '/categories/new',
		exact: true,
		layout: DefaultLayout,
		component: AddCategories
	},
	{
		path: '/categories/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddCategories
	},
	{
		path: '/categories/:id',
		exact: true,
		layout: DefaultLayout,
		component: CategoryDetails
	},
	{
		path: '/sub-categories',
		exact: true,
		layout: DefaultLayout,
		component: SubCategories
	},
	{
		path: '/sub-categories/new',
		exact: true,
		layout: DefaultLayout,
		component: AddSubCategories
	},
	{
		path: '/sub-categories/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddSubCategories
	},
	{
		path: '/sub-categories/:id',
		exact: true,
		layout: DefaultLayout,
		component: SubCategoryDetails
	},
	{
		path: '/service-type',
		exact: true,
		layout: DefaultLayout,
		component: ServiceType
	},
	{
		path: '/service-type/new',
		exact: true,
		layout: DefaultLayout,
		component: AddEditServiceType
	},
	{
		path: '/service-type/:id/edit',
		exact: true,
		layout: DefaultLayout,
		component: AddEditServiceType
	},
	{
		path: '/service-type/:id',
		exact: true,
		layout: DefaultLayout,
		component: ServiceDetail
	},
	{
		path: '/components-overview',
		layout: DefaultLayout,
		component: ComponentsOverview
	},
	{
		path: '/tables',
		layout: DefaultLayout,
		component: Tables
	},

	{
		layout: LoginLayout,
		component: ErrNotFound
	}
];

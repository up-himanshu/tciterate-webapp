import React from 'react';
import { Redirect } from 'react-router-dom';

// Layout Types
import { DefaultLayout, LoginLayout } from './layouts';

// Route Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';

import AdminProfile from './views/admin/profile';

import Users from './views/Users/list';
import AddUser from './views/Users/addEdit';
import UserDetail from './views/Users/detail';

import Projects from './views/Projects/list';
import AddProject from './views/Projects/addEdit';
import ProjectDetail from './views/Projects/detail';

import TestCases from './views/TestCases/list';
import AddTestCase from './views/TestCases/addEdit';
import TestCaseDetail from './views/TestCases/detail';

import Executions from './views/Executions/list';
import AddExecution from './views/Executions/addEdit';
import ExecutionDetail from './views/Executions/detail';

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
		path: '/projects/:project_id/testcases',
		exact: true,
		layout: DefaultLayout,
		component: TestCases
	},
	{
		path: '/projects/:project_id/testcases/new',
		exact: true,
		layout: DefaultLayout,
		component: AddTestCase
	},
	{
		path: '/projects/:project_id/executions',
		exact: true,
		layout: DefaultLayout,
		component: Executions
	},
	{
		path: '/projects/:project_id/executions/new',
		exact: true,
		layout: DefaultLayout,
		component: AddExecution
	},
	{
		path: '/projects/:project_id/executions/:execution_id',
		exact: true,
		layout: DefaultLayout,
		component: ExecutionDetail
	},

	{
		path: '/admin',
		layout: DefaultLayout,
		component: AdminProfile
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

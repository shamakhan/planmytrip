import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import setupScrollReveal from './MainPage/components/scrollEffect';

import {Provider} from 'react-redux';
import store from './PlanPage/Store';

import App from './MainPage/mainPage';
import UserPlan from './UserPlan';


if(document.querySelector('#mainpage')){
ReactDOM.render(
		<App />
	,document.querySelector('#mainpage'));

//setupScrollReveal();
}
if(document.querySelector('#plan'))
	{
		ReactDOM.render(
		<Provider store={store}>
		<UserPlan />
		</Provider>
		,document.querySelector('#plan'));

}
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import setupScrollReveal from './components/scrollEffect';
import App from './app';


ReactDOM.render(<App/>,document.querySelector('#app'));
setupScrollReveal();
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



//************************GET REQUESTS****************************************

Route::get('/home/plan', ['uses' => 'PlanController@createPlan']);

Route::get('/updateCategories', ['uses' => 'UtilitiesController@updateAllTopCategories']);

Route::get('/home/getCategories', ['uses' => 'PlanController@getCategories']);

Route::get('/home/getLocDistance',['uses' => 'PlanController@getLocDistance']);

Route::get('/home/getLocThumbnails', ['uses' => 'PlanController@getThumbnails']);

//************************POST REQUESTS**************************************
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

//************************GET REQUESTS****************************************

Route::get('plan', ['uses' => 'PlanController@createPlan']);

Route::get('updateCategories', ['uses' => 'UtilitiesController@updateAllTopCategories']);

Route::get('getCategories', ['uses' => 'PlanController@getCategories']);


//************************POST REQUESTS**************************************
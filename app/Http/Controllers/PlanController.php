<?php

namespace App\Http\Controllers;

use App\Http\utilities\CategoriesOpertations;
use App\Services\GenerateQuery;
use App\Services\RedisOperations;
use App\Services\TimeOperations;
use App\Tasks\PopulateRedis;
use Codeception\Module\Redis;
use Illuminate\Http\Request;
use App\location;
use App\Services\GeneratePlan;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rules\In;

class PlanController extends Controller
{
    public function createPlan(){

        $city =  Input::get('city');
        $topCategories = Input::get('topCategories');
        $days = Input::get('days');
        //$topCategories = $topCategories->toArray();
        /*$topCategories = array();
        $topCategories[0] = "Outdoors";
        $topCategories[1] = "Historical Site";
        $topCategories[2] = "Entertainment";
        $topCategories[3] = "Religious Site";
        $topCategories[4] = "Landmark";*/

        $generateQuery = new GenerateQuery();

        if (empty($topCategories)){
            $locations = $generateQuery->getAllLocations($city)
            ->get();
        }else{
            $locations = $generateQuery->orLikeQuery($city, $topCategories)
                ->get();
            $locations = $locations->toArray();

            $locationsAppend = $generateQuery
                ->notLikeQuery($city, $topCategories)
                ->get();
            $locationsAppend = $locationsAppend->toArray();

            $locations = array_merge($locations, $locationsAppend);
        }

        $generatePlan = new GeneratePlan($locations, $days);
        $generatePlan->createTripPlan();

        return $generatePlan->getTripPlan();



        //return $locations;
        //$redisOp = new RedisOperations();
        //$redisOp->setHash("pariscountry", 2321, 100);
        //$user = $redisOp->getHash("pariscountry");
        /*$redOp = new RedisOperations();
        return $redOp->exists("dsadsdsdasd");*/

        /*set_time_limit ( 0 );
        $pop = new PopulateRedis();

        $pop->writeToRedis();

        return "done";
        //$redisOp = new RedisOperations();
        //return $redisOp->getDurationRedis("Pont Alexandre Iii", "Hippodrome Paris Vincennes");


        $locations = location::select('name', 'latitude', 'longitude')->limit(10)->get();
        return $locations;
        return $pop->readFromRedis()[0]["distance"];*/
    }

    public function getCategories(){

        $city =  Input::get('city');
        $catOp = new CategoriesOpertations();

        return $catOp->getTopCategories($city);
    }

    public function getThumbnails(){
        $city =  Input::get('city');
        $locations = new location();
        $locations->setTable($city);
        $thumbnails = $locations->select('id', 'name', 'image', 'description')

            ->get();
        return $thumbnails->toArray();
    }

    public function getLocDistance(){
        $location1 = Input::get('location1');
        $location2 = Input::get('location2');

        $redisOp = new RedisOperations();
        $timeOp = new TimeOperations();
        $redis["distance"] = $redisOp->getDistanceRedis($location1, $location2);
        $redis["duration"] = $timeOp
            ->getTimeInString($redisOp
                ->getDurationRedis($location1, $location2));

        return $redis;
    }
}
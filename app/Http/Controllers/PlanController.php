<?php

namespace App\Http\Controllers;

use App\Http\utilities\CategoriesOpertations;
use App\Services\GenerateQuery;
use App\Services\RedisOperations;
use App\Tasks\PopulateRedis;
use Codeception\Module\Redis;
use Illuminate\Http\Request;
use App\location;
use App\Services\GeneratePlan;
use Illuminate\Support\Facades\Input;

class PlanController extends Controller
{
    public function createPlan(){

        $city =  Input::get('city');
        $topCategories = json_decode(Input::get('topCategories'));
        $days = Input::get('days');

        //return $topCategories;
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
            $locations = $locations->toArray();
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
        $generatePlan = new GeneratePlan($locations,$days);
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
        $thumbnails = $locations->select('id', 'name', 'image', 'description')
            ->limit(4)
            ->get();
        return $thumbnails->toArray();
    }
}
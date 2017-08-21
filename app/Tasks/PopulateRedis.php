<?php
/**
 * Created by PhpStorm.
 * User: mithil
 * Date: 17/8/17
 * Time: 5:53 PM
 */

namespace App\Tasks;

use App\location;
use App\Services\TimeOperations;
use App\Services\DistanceOperations;
use App\Services\RedisOperations;

class PopulateRedis
{

    public function writeToRedis(){

        $cities = array("dubai");
        //$cities = array("paris");
        $redisOp = new RedisOperations();

        for ($k=0; $k<sizeof($cities); $k++){
            $locations = $this->getLocationsArray($cities[$k]);

            for ($i=0; $i<sizeof($locations); $i++){
                if(isset($locations[$i]['latitude'])){
                    for ($j=$i+1; $j<sizeof($locations); $j++){
                        if (isset($locations[$j]['latitude'])){

                            $key = $redisOp->createKey($locations[$i]["name"], $locations[$j]["name"]);

                            if ($redisOp->exists($key)>0){
                                continue;
                            }
                            $distanceAndTime = $this->getDistanceAndDuration($locations[$i], $locations[$j]);

                            $redisOp->setHash($key, $distanceAndTime["distance"], $distanceAndTime["duration"]);

                        }
                    }
                }
            }
        }
    }

    public function getLocationsArray($cityName){

        $location = new location();
        $location->setTable($cityName);
        $locations = $location->select('name', 'latitude', 'longitude')->get();
        $locations = $locations->toArray();
        return $locations;
    }


    public function getDistanceAndDuration($currentLocation, $nextLocationToGo){
        $response = null;
        if(isset($currentLocation['latitude']) && isset($nextLocationToGo['latitude'])){
            $response = \GoogleMaps::load('distancematrix')
                ->setParam ([
                    'origins' =>$currentLocation['latitude'].",".$currentLocation['longitude'],
                    'destinations' => $nextLocationToGo['latitude'].",".$nextLocationToGo['longitude'],
                    'mode' => 'transit'
                ])
                ->get();

            $response = \GuzzleHttp\json_decode($response, true);
        }else{
            return 0.5;
        }
        $timeOp = new TimeOperations();
        $distanceOp = new DistanceOperations();
        $distanceAndTime = array();


        $attempts = 0;
        while (array_key_exists("error_message", $response) && $attempts<4){
            echo "started\n\n";
            //echo "sleepings";
            //dd($response);
            //echo "sleeping";
            sleep(5);
            echo "slept";
            $response = \GoogleMaps::load('distancematrix')
                ->setParam ([
                    'origins' =>$currentLocation['latitude'].",".$currentLocation['longitude'],
                    'destinations' => $nextLocationToGo['latitude'].",".$nextLocationToGo['longitude'],
                    'mode' => 'transit'
                ])
                ->get();

            $response = \GuzzleHttp\json_decode($response, true);
            //dd($response);
            $attempts++;
            echo $attempts;
        }
        if ($attempts>=4){
            exit("failed");
        }


        if (array_key_exists("distance",$response["rows"][0]["elements"][0])){
            $distanceAndTime["distance"] = $distanceOp->getGoogleAPIDistance($response["rows"][0]["elements"][0]["distance"]["text"]);
        }else{
            $distanceAndTime["distance"] = 'NA';
        }
        if (array_key_exists("duration",$response["rows"][0]["elements"][0])){
            $distanceAndTime["duration"] = $timeOp->getGoogleAPITime($response["rows"][0]["elements"][0]["duration"]["text"]);
        }else{
            $distanceAndTime["duration"] = 1;
        }
        return $distanceAndTime;
    }

    public function readFromRedis(){
        $locations = location::select('name', 'latitude', 'longitude')->limit(10)->get();
        $locations = $locations->toArray();

        $redisKeys = array();

        $redisOp = new RedisOperations();

        for ($i=0; $i<sizeof($locations); $i++){
            if(isset($locations[$i]['latitude'])){
                for ($j=$i+1; $j<sizeof($locations); $j++){
                    if (isset($locations[$j]['latitude'])){

                        $key = $redisOp->createKey($locations[$i]["name"], $locations[$j]["name"]);
                        array_push($redisKeys, $redisOp->getAllHash($key));
                    }
                }
            }
        }
        return $redisKeys;
    }
}
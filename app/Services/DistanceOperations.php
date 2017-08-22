<?php

namespace App\Services;


class DistanceOperations
{

    /**
     * DistanceOperations constructor.
     */
    public function __construct()
    {
    }

    public function minDistanceLocation($currentLocation, $nextLocationToGo, $location, $currentTime)
    {
        //echo "asd".$currentLocation["latitude"];
        $timeOp = new TimeOperations();

        if ($timeOp->inBetween($currentTime, $location["timeOpen"], "timeOpen")){

            if(isset($currentLocation['latitude']) && isset($nextLocationToGo['latitude']) && isset($location['latitude'])){

                $nextLocationToGoDistance = $this->getDistance($currentLocation['name'], $nextLocationToGo['name']);
                $locationDistance = $this->getDistance($currentLocation['name'], $location['name']);

                if ($locationDistance < $nextLocationToGoDistance){
                    return 1;
                }
            }
        }

        return -1;
    }

    public function getDistance($location1, $location2){
        /*$theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $dist = $dist * 60 * 1.1515 * 1.609344;

        return $dist;*/

        $redisOp = new RedisOperations();
        return $redisOp->getDistanceRedis($location1, $location2);
    }

    public function getGoogleAPIDistance($distance){
        $distanceArray = explode(" ", $distance);
        $distance = $distanceArray[0];
        return $distance;
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: mithil
 * Date: 17/8/17
 * Time: 5:09 PM
 */

namespace App\Services;

use Illuminate\Support\Facades\Redis;

class RedisOperations
{
    public function setHash($hashName, $distance, $duration){
        Redis::hmset($hashName, 'distance', $distance, 'duration', $duration);
    }

    public function getAllHash($hashName){
        return Redis::hgetall($hashName);
    }

    public function getHashAttribute($hashName, $attribute){
        return Redis::hget($hashName, $attribute);
    }

    public function exists($key){
        return Redis::exists($key);
    }

    public function createKey($location1, $location2){

        $key = null;

        if (strcmp($location1, $location2)<0){
            $key = str_replace(' ', '', $location1).str_replace(' ', '', $location2);
        }else{
            $key = str_replace(' ', '', $location2).str_replace(' ', '', $location1);
        }

        return $key;
    }

    public function getDistanceRedis($location1, $location2){

        //check isset
        $key = $this->createKey($location1, $location2);
        $distance = $this->getHashAttribute($key, "distance");

        return $distance;

    }

    public function getDurationRedis($location1, $location2){

        $key = $this->createKey($location1, $location2);
        $duration = $this->getHashAttribute($key, "duration");

        return $duration;
    }

}
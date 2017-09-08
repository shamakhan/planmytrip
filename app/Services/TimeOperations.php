<?php


namespace App\Services;


class TimeOperations
{

    /**
     * TimeOperations constructor.
     */
    public function __construct()
    {
    }

    public function inBetween($currentTime, $timePreferred, $time)
    {

        if (empty($timePreferred) && $time == "timePreferred") {
            return false;
        }elseif ((empty($timePreferred) || $timePreferred=="24 hrs") && $time == "timeOpen"){
            return true;
        } else {

            $startTime = $this->getStartTime($timePreferred);

            $endTime = $this->getEndTime($timePreferred);

            if ($time != "timePreferred"){
                $endTime -= 1;
            }

            if($currentTime >= $startTime && $currentTime <= $endTime){
                return true;
            }
        }

        return false;
    }

    private function getStartTime($time){

        $startTime = (float)substr($time, 0, 2);
        $startTime += ((float)substr($time, 3, 2)) / 60;

        if (substr($time, 6, 2) == 'pm') {
            if (floor($startTime) == 12) {
                return $startTime;
            }
            $startTime += 12;
        }

        return $startTime;
    }

    private function getEndTime($time){

        $endTime = (float)substr($time, 11, 2);
        $endTime += ((float)substr($time, 14, 2)) / 60;

        if (substr($time, 17, 2) == 'pm') {
            if (floor($endTime) == 12) {
                return $endTime;
            }
            $endTime += 12;
        }

        return $endTime;
    }

    public function getTime($timeRequired)
    {
        if (empty($timeRequired)){
            return 1;
        }

        $time = (float)substr($timeRequired, 0, 2);
        $time += ((float)substr($timeRequired, 3, 2)) / 60;

        return $time;

    }

    public function getTimeInString($time){

        $hours = floor($time);
        $minutes = (int)(($time - floor($time)) * 60);
        if ($hours == 0){
            return $minutes." minutes";
        }
        return $hours." hrs ".$minutes." minutes";
    }

    public function getTravelTime($currentLocation, $nextLocationToGo)
    {
        //use time()
        /* $response = null;
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
         $hrs = $timeOp->getGoogleAPITime($response["rows"][0]["elements"][0]["duration"]["text"]);

         //echo $response;
         //echo var_dump($response);
         //echo $response["destination_addresses"][0]."\n\n";
         //echo $response["rows"][0]["elements"][0]["duration"]["text"]."\n";
         //echo $hrs."\n\n";

         return $hrs;*/

        $redisOp = new RedisOperations();
        return $redisOp->getDurationRedis($currentLocation["name"], $nextLocationToGo["name"]);

    }


    public function getGoogleAPITime($time){

        $timeArray = explode(" ", $time);
        $hours = 0;
        if (strpos($time, "hour")){
            $hours = (float)$timeArray[0];
            $hours += (float)($timeArray[2]/60);
        }else{
            $hours += (float)($timeArray[0] / 60);
        }

        return round($hours, 2);
    }

    public function convertTo24Format($timeIn24){

        $hour = floor($timeIn24);
        $minutes = (int)(($timeIn24 - $hour) * 60);

        $hour = sprintf("%02d", $hour);
        $minutes = sprintf("%02d", $minutes);
        return $hour.':'.$minutes;
    }

    public function addHourTo24Format($timeInString, $hours){
        $currenHour = (int)substr($timeInString, 0, strpos($timeInString, ':'));
        $currenHour += $hours;
        $currenHour = sprintf("%02d", $currenHour);

        return $currenHour.substr($timeInString, strpos($timeInString, ':'));
    }


}
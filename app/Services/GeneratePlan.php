<?php

namespace App\Services;

use App\location;
use function Symfony\Component\Debug\Tests\testHeader;

class GeneratePlan
{
    private $locations = array();
    private $completePlan = array();
    private $locationPlan = array();
    private $totDays = null;

    public function __construct($locations, $totDays){

    $this->locations = $locations;
    $this->totDays = $totDays;
   }

   public function getTripPlan(){

      return $this->completePlan;
   }




    public function createTripPlan(){

       global $currentLocation;
       $days = 0;


       $timeOp = new TimeOperations();
       $distanceOp = new DistanceOperations();

       define("MAXLOCATIONSTOCHECK", 20);
       define("TOTALTIME", 21);
       define("LUNCHTIME", 1);
       define("MAXTIMENOLUNCH", 15);
       define("timePreferred", "timePreferred");
       define("timeOpen", "timeOpen");


        //$travelTime->getTravelTime("dsa", "das", "sad");

       while($days<$this->totDays && !empty($this->locations)){


           $this->resetDayPlan();
           $currentTime = (float)9;
           $currentTravelTime = (float)0;
           $currentTime10 = false;

           $locationsToCheck = 15;

           $firstLocFound = false;

           $nextLocationToGo = null;
           $nextLocationToGoIndex = -1;

           $locationPlanIndex = -1;
           $lunchDone = false;





        if (!$firstLocFound) {
          for($i=0; $i<$locationsToCheck; $i++){
            if($timeOp->inBetween($currentTime, $this->locations[$i]["timePreferred"], timePreferred)){

                        $this->addToDayPlan($this->locations[$i], $currentTime, 0, 0);
              $locationPlanIndex++;
              $currentTime += $this->getRequiredTime($i);

              $this->deleteFromLocations($i);
              $firstLocFound = true;

              break;

            }
          }

          if (!$firstLocFound) {              //still not found
            for($i=0; $i<$locationsToCheck; $i++){

              if($timeOp->inBetween($currentTime, $this->locations[$i]["timeOpen"], timeOpen)){

                            $this->addToDayPlan($this->locations[$i], $currentTime, 0, 0);
                  $locationPlanIndex++;
                  $currentTime += $this->getRequiredTime($i);

                            $this->deleteFromLocations($i);
                            $firstLocFound = true;
                            //var_dump($this->locationPlan);

                            break;

              }

              if ($i == $locationsToCheck - 1 && !$currentTime10) {
                $i = -1;
                $currentTime += 1;
                $currentTime10 = true;
                $locationsToCheck = sizeof($this->locations);
              }
            }
          }
        }


        //first location found

        $locationsToCheck = MAXLOCATIONSTOCHECK;

        while ($currentTime < TOTALTIME) {

            for ($i=0; $i<sizeof($this->locations); $i++){//first location that is open at the current time
                    if($timeOp->inBetween($currentTime, $this->locations[$i]["timeOpen"], timeOpen)){
                        $nextLocationToGo = $this->locations[$i];
                        $nextLocationToGoIndex = $i;
                        break;
                    }
                }

                $currentLocation = $this->locationPlan[sizeof($this->locationPlan)-1];
          for($i=1; $i<$locationsToCheck; $i++){

              //var_dump($this->locationPlan);

            if($distanceOp->minDistanceLocation($currentLocation, $nextLocationToGo, $this->locations[$i], $currentTime) > 0){
              $nextLocationToGo = $this->locations[$i];
              $nextLocationToGoIndex = $i;
            }

          }

          $currentTravelTime = $timeOp->getTravelTime($currentLocation, $nextLocationToGo);
                $currentDistance = $distanceOp->getDistance($currentLocation['name'], $nextLocationToGo['name']);
          $currentTime += $currentTravelTime;
          round($currentTime, 2);
                //$currentTime += 1; //travelling
                $this->addToDayPlan($nextLocationToGo, $currentTime, $currentTravelTime, $currentDistance);
          $locationPlanIndex++;
          $currentTime += $this->getRequiredTime($nextLocationToGoIndex);


          if(!$lunchDone){ //!$lunchDone
                if ($currentTime >= MAXTIMENOLUNCH) {

                                $currentTime1 = $currentTime;
                                $currentTime1 -= $this->getRequiredTime($nextLocationToGoIndex);

                                $currentTime1 -= $currentTravelTime;
                                round($currentTime1, 2);


                    $this->addLunchToDayPlan($currentTime1);
                  $locationPlanIndex++;
                                //echo $currentTime."sdasd";
                  $currentTime += LUNCHTIME;
                  $lunchDone = true;

                }
              }else if($currentTime > TOTALTIME){
                $this->deleteLastLocationFromDayPlan();
                //echo "\n\n\n".$this->locations[$i]."\n\n\n";
                            //$currentTime -= $currentTravelTime; //travelling
                            //round($currentTime, 2);
                            //$currentTime -= $this->getRequiredTime($i);

                break;

              }
                $this->deleteFromLocations($nextLocationToGoIndex);

        }

        //day change
           //echo "\n\n\n";

           $this->setDayPlan($this->locationPlan);
           $days++;

      }
      
   }

   private function deleteFromLocations($index){
       unset($this->locations[$index]);
       $this->locations = array_values($this->locations);
   }

   private function deleteLastLocationFromDayPlan(){
       unset($this->locationPlan[sizeof($this->locationPlan)-1]);
       $this->locationPlan = array_values($this->locationPlan);
   }

   private function addToDayPlan($location, $currentTime, $currentTravelTime, $currentDistance){
       $timeOp = new TimeOperations();

       $location["timeArrival"] = $currentTime;
       $location["timeTravel"] = $timeOp->getTimeInString((float)$currentTravelTime);
       $location["ditanceTravel"] = $currentDistance;
       array_push($this->locationPlan, $location);
   }

   private function addLunchToDayPlan($currentTime){
       //$currentLocation = $this->locationPlan[sizeof($this->locationPlan)-1];

       //$currentLocation["id"] = -1;
       //$currentLocation["name"] = "LUNCH";
       //$currentLocation = json_encode(array("timeRequired" => $currentTIme, "name" => "LUNCH"));
       //$tempLocation = array_splice($this->locationPlan, sizeof($this->locationPlan)-1, 1, $currentLocation);
       //var_dump($tempLocation);
       //array_push($this->locationPlan, $tempLocation);
       array_push($this->locationPlan, $this->locationPlan[sizeof($this->locationPlan)-1]);

       $this->locationPlan[sizeof($this->locationPlan)-2]["name"] = "lunch";
       $this->locationPlan[sizeof($this->locationPlan)-2]["timeArrival"] = $currentTime;
       $this->locationPlan[sizeof($this->locationPlan)-1]["timeArrival"] = (float)($this->locationPlan[sizeof($this->locationPlan)-1]["timeArrival"] + 1);

   }

   private function resetDayPlan(){$this->locationPlan = array();}

   private function setDayPlan($dayPlan){array_push($this->completePlan, $dayPlan);}

   private function getRequiredTime($index){
       $timeOp = new TimeOperations();

       $timeRequired = $timeOp->getTime($this->locations[$index]["timeRequired"]);
       if ($timeRequired > 4){
           return 4;
       }
       return $timeRequired;
   }
    
}
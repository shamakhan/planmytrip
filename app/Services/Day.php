<?php

namespace App\Services;

use App\location;

class Day
{
	private locations = array();

	public function setLocations($locations){
		$this->locations = $locations;
	}
	public function getLocations(){
		return $locations;
	}
}
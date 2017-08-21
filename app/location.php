<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class location extends Model
{
    public $table = 'paris';
    public $timestamps = false;

     public function getIdAttribute($value)
    {
        return $value;
    }

}

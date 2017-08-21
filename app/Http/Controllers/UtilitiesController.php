<?php

namespace App\Http\Controllers;

use App\Http\utilities\CategoriesOpertations;
use Illuminate\Http\Request;

class UtilitiesController extends Controller
{
    public function updateAllTopCategories(){
        $catOp = new CategoriesOpertations();
        $catOp->updateCategories("paris");
        $catOp->updateCategories("london");
        $catOp->updateCategories("newyork");
        $catOp->updateCategories("dubai");
        $catOp->updateCategories("mumbai");
    }
}

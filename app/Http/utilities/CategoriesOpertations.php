<?php
/**
 * Created by PhpStorm.
 * User: mithil
 * Date: 21/8/17
 * Time: 12:16 PM
 */

namespace App\Http\utilities;


use App\location;

class CategoriesOpertations
{
    public function getSortedCategories($city){
        $locations = new location();
        $locations->setTable($city);
        $locationCategories = $locations->select("categories")
                                ->get();

        $categoryCount = array();
        foreach ($locationCategories as $categories ){
            $categoriesArray = explode(", ", $categories["categories"]);


            for ($i=0; $i<sizeof($categoriesArray); $i++){
                if (array_key_exists($categoriesArray[$i], $categoryCount)){
                    $categoryCount[$categoriesArray[$i]] += 1;
                }else{
                    $categoryCount[$categoriesArray[$i]] = 1;
                }
            }

        }

        arsort($categoryCount);
        return $categoryCount;
    }

    public function calculateTopCategories($city){
        $sortedCategories = $this->getSortedCategories($city);
        $index = 0;
        $row = "";
        foreach ($sortedCategories as $category => $count){
            if ($index>7){break;}
            else{

                $row .= $category.", ";
            }
            $index++;
        }
        return substr($row, 0, strlen($row)-2);

    }

    public function updateCategories($city){
        $categories = $this->calculateTopCategories($city);

        $attributes["city"] = $city;
        $values["city"] = $city;
        $values["categories"] = $categories;
       \DB::table("topcategories")
            ->updateOrInsert($attributes, $values);
    }

    public function getTopCategories($city){
        $categories = \DB::table("topcategories")
            ->select("categories")
            ->where("city", "=", $city)
            ->get();
        $categories = $categories->toArray();
        $categoriesArray = explode(", ", $categories[0]->categories);

        return $categoriesArray;
    }
}
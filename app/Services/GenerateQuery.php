<?php
namespace App\Services;

use App\location;

class GenerateQuery
{
    public function likeQuery($city, $categories){
        $locations = new location();
        $locations->setTable($city);
        $query = $locations->select('*');

            for($i=0; $i<sizeof($categories); $i++){
                $query->where('categories', 'like', '%'.$categories[$i].'%');
            }
            $query->orderBy('rating', 'desc');
        return $query;
    }


    public function notLikeQuery($city, $categoriesNotLike){
        $locations = new location();
        $locations->setTable($city);
        $query = $locations->select('*');

        for($i=0; $i<sizeof($categoriesNotLike); $i++){
            $query->where('categories', 'not like', '%'.$categoriesNotLike[$i].'%');
        }
        $query->orderBy('rating', 'desc');
        return $query;
    }


    public function likeNotLikeQuery($city, $categoryLike, $categoriesNotLike){
        $locations = new location();
        $locations->setTable($city);
        $query = $locations->select('*');


        $query->where('categories', 'like', '%'.$categoryLike.'%');

            for ($i=0; $i<sizeof($categoriesNotLike); $i++){
                $query->where('categories', 'not like', '%'.$categoriesNotLike[$i].'%');
            }
            $query->orderBy('rating', 'desc');
        return $query;
    }

    public function orLikeQuery($city, $categories){

        $locations = new location();
        $locations->setTable($city);
        $query = $locations->select('*');
        $query->where('categories', 'like', '%'.$categories[0].'%');

        for ($i=1; $i<sizeof($categories); $i++){
            $query->orWhere('categories', 'like', '%'.$categories[$i].'%');
        }
        $query->orderBy('rating', 'desc');

        return $query;
    }

    public function getAllLocations($city){
        $locations = new location();
        $locations->setTable($city);
        $query = $locations->select('*');
        $query->orderBy('rating', 'desc');

        return $query;
    }
}
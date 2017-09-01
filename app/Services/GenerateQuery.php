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

    public function getLocationsList($city, $topCategories){
        $locations = new location();
        $locations->setTable($city);
        $selectCaseQuery = '';

        for ($i=0; $i<sizeof($topCategories); $i++){
            $selectCaseQuery = $selectCaseQuery.' (SELECT 
            CASE 
            WHEN b.categories LIKE \'%'.$topCategories[$i].'%\'
            THEN 1
            ELSE 0
            END 
            from '.$city.' as b
            WHERE a.id = b.id) +';
        }

        $selectCaseQuery = substr($selectCaseQuery, 0, strlen($selectCaseQuery)-1);
        $locationsList = \DB::select('SELECT *, '.$selectCaseQuery.'AS count
        FROM '.$city.' AS a order by count desc');

        for ($i=0; $i<sizeof($locationsList); $i++){
            $locationsList[$i] = (array) $locationsList[$i];
        }


        return $locationsList;
    }
}
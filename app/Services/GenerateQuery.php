<?php
namespace App\Services;

use App\location;

class GenerateQuery
{
    public function likeQuery($categories){
        $query = location::select('*');

            for($i=0; $i<sizeof($categories); $i++){
                $query->where('categories', 'like', '%'.$categories[$i].'%');
            }
            $query->orderBy('rating', 'desc');
        return $query;
    }


    public function notLikeQuery($categoriesNotLike){
        $query = location::select('*');

        for($i=0; $i<sizeof($categoriesNotLike); $i++){
            $query->where('categories', 'not like', '%'.$categoriesNotLike[$i].'%');
        }
        $query->orderBy('rating', 'desc');
        return $query;
    }


    public function likeNotLikeQuery($categoryLike, $categoriesNotLike){
            $query = location::select('*');


                $query->where('categories', 'like', '%'.$categoryLike.'%');

            for ($i=0; $i<sizeof($categoriesNotLike); $i++){
                $query->where('categories', 'not like', '%'.$categoriesNotLike[$i].'%');
            }
            $query->orderBy('rating', 'desc');
        return $query;
    }

    public function orLikeQuery($categories){

            $query = location::select('*');
            $query->where('categories', 'like', '%'.$categories[0].'%');

            for ($i=1; $i<sizeof($categories); $i++){
                $query->orWhere('categories', 'like', '%'.$categories[$i].'%');
            }
            $query->orderBy('rating', 'desc');

        return$query;
    }
}
<?php

namespace pcrt\behavior;

use Yii;
use yii\base\Behavior;

// Add method to extract key,description array valid to Select2 dropdown .
class Lookable extends Behavior
{
    public function getTableList($query, $limit) {
      $count = $query->count();
      if($query->count() > $limit){
        $result = $query->all()->asArray();
        return [
          'results' => $result,
          'pagination' => [
            'more' => true;
          ]
        ]
      }else{
        return [
          'results' => $result
        ]
      }
    }
}

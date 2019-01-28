<?php


namespace pcrt\generators\crud;
use Yii;
use yii\db\ActiveRecord;
use yii\db\BaseActiveRecord;
use yii\db\Schema;
use yii\gii\CodeFile;
use yii\helpers\Inflector;
use yii\helpers\VarDumper;
use yii\web\Controller;



class Generator extends \yii\gii\generators\crud\Generator
{
  
  private function generateSelect2ActiveField($attribute)
  {
    
  }
  
  public function generateActiveField($attribute)
  {
      $tableSchema = $this->getTableSchema();
      if ($tableSchema === false || !isset($tableSchema->columns[$attribute])) {
          if (preg_match('/^(password|pass|passwd|passcode)$/i', $attribute)) {
              return "\$form->field(\$model, '$attribute')->passwordInput()";
          }
          return "\$form->field(\$model, '$attribute')";
      }
      $column = $tableSchema->columns[$attribute];
      $fk = $tableSchema->foreignKeys;
      \Yii::trace($tableSchema);
      \Yii::trace($fk);
      \Yii::trace($column);
      
      foreach($fk as $f){
        foreach ($f as $key => $val) {
          \Yii::trace("KEY is ".$key);
          \Yii::trace("CNAME is ".$column->name);
          if($key !== 0 && $key == $column->name){
            \Yii::trace($column->name . " is a foreignKey!");
          }
        }
      }
      
      parent::generateActiveField($attribute);
  }
  
  
}
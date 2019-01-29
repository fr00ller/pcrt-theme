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
  public function getName()
  {
      return 'PCRT CRUD Generator';
  }
  /**
   * {@inheritdoc}
   */
  public function getDescription()
  {
      return 'This generator generates an ActiveRecord class for the specified database table with PCRT customization.';
  }

  private function generateSelect2ActiveField($table, $column, $fktable)
  {
    return "\$form->field(\$model, '$column->name')->widget(
        Select2::class,
        [
            'items' => [],
            'clientOptions' => [
              'ajax' => [
                'url' => 'index.php?r=$table->name/get-$fktable',
                'data' => new JsExpression('function (params) {
                    var query = {
                      query: params.term,
                      page: params.page || 0
                    }
                    return query;
                  }'),
                'dataType' => 'json'
              ]
            ]
        ]
    );";
  }

  // TODO: Need Improve for multicolumn FK ???
  public function getForeignKeys(){
    $FK = [];
    $tableSchema = $this->getTableSchema();
    if ($tableSchema !== false) {
      $fk = $tableSchema->foreignKeys;
      foreach($fk as $f){
        $fk = [];
        $fk['table'] = $tableSchema->name;
        foreach ($f as $key => $val) {
          if($key === 0){
            $fk['fk_table'] = $val;
          }else{
            $fk['fk_field'] = $val;
            $fk['field'] = $key;
          }
        }
        $FK[] = $fk;
      }
    }
    \Yii::trace($FK);
    return $FK;
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
      $fk = $this->getForeignKeys();
      foreach($fk as $f){
        if($f['field']==$column->name){
          return $this->generateSelect2ActiveField($tableSchema,$column,$f['fk_table']);
        }
      }

      return parent::generateActiveField($attribute);
  }


}

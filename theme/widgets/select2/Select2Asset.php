<?php

namespace pcrt\widget\select2;

use yii\web\AssetBundle;

class Select2Asset extends AssetBundle
{
    public $sourcePath = __DIR__ . '/assets';

    public $js = [
        'js/select2.full.js'
    ];

    public $css = [
        'css/select2.css'
    ];

}

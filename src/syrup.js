/*
 * SyrupJS
 * The System Runtime Platform
 * http://syrupjs.systemdesigner.io
 * @ecarriou
 *  
 * Copyright (c) 2016 Erwan Carriou
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 */

/**
 * This module is the main module of syrup. <br>
 * It inits syrup metamodel and loads syrup core system.
 * 
 * @module syrup
 * @requires syrup-component
 * @requires syrup-metamodel
 * @requires syrup-system
 * @requires syrup-helper
 * @main syrup
 * @class syrup
 * @static
 */

'use strict';

var $db = require('./db.js');
var $component = require('./component.js');
var $metamodel = require('./metamodel.js');
var $system = require('../build/system/system.js');
var $helper = require('./helper.js');


/* Private Property */

var sytemId = '',
    system = '';


/* Polyfill */
$helper.polyfill();

/* Init Metamodel */


$metamodel.init();


/* Init syrup from a  system */


sytemId = $db.system($system.system);
system = $component.get(sytemId);
system.main();


/* exports */


/**
 * This module is the main module of syrup. <br>
 * It inits syrup metamodel and loads syrup core system.
 * 
 * @module syrup
 * @requires syrup-component
 * @requires syrup-metamodel
 * @requires syrup-system
 * @main syrup
 * @class syrup
 * @static
 */


/**
 * syrup instance.
 * @property syrup
 * @type Syrup
 */
module.exports = $component.get('syrup');
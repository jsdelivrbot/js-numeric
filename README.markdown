js-numeric
========

Javascript numeric limit input library

<h2><a name="about" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>About</h2>

Limit value for html input element.

<img src="http://i.imgur.com/EaujkKq.jpg" />

<h2><a name="usage" class="anchor" href="#usage"><span class="mini-icon mini-icon-link"></span></a>Usage</h2>

```html
<script type="text/javascript" src="js-numeric.js"></script>
<input type="text" name="numeric1" id="numeric1" placeholder="numeric (10)" onkeypress="return NumericLimits(this, 10);" />
```

```html
<script type="text/javascript" src="js-numeric.js"></script>
<input type="text" name="numeric1" id="numeric1" placeholder="numeric (10)" onkeypress="return NumericLimits(this, 10, limit10);" />
```

<h2><a name="callback" class="anchor" href="#callback"><span class="mini-icon mini-icon-link"></span></a>Callback</h2>

```js
var limit10 = function(sender, global_value, limit_number) {
    alert("Error: number " + global_value + " cant over or less " + limit_number + "!!");
};
```

<h2><a name="v2" class="anchor" href="#v2"><span class="mini-icon mini-icon-link"></span></a>V2</h2>

```html
<form id="form">
    <label for="numeric ">Numeric</label>
    <input type="text" name="numeric1" id="numeric1" placeholder="numeric (10 ~ 100)" />
    <input type="submit" value="Enter" />
</form>

<script language="javascript">
(function() {
    var limit10 = new JsNumeric({
        target: document.getElementById("numeric1"),
        callback: function(sender, globalValue, limit){
            alert("XD");
        },
        limit: {
            max: 100,
            min: 10
        }
    });
})();
</script>
```

<h2><a name="changelog" class="anchor" href="#about"><span class="mini-icon mini-icon-link"></span></a>Changelog</h2>

<h4>1.01</h4>
- Added callback function for limit alert.
- Fixed some bugs.

<h2><a name="author" class="anchor" href="#author"><span class="mini-icon mini-icon-link"></span></a>Author</h2>
* 2013 rchockxm (rchockxm.silver@gmail.com)

<h2><a name="credits" class="anchor" href="#credits"><span class="mini-icon mini-icon-link"></span></a>Credits</h2>
* Myerweb - css stylesheet <a href="http://meyerweb.com/eric/tools/css/reset/">Link</a>


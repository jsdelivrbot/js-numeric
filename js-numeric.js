/*
 * js-numeric - 1.01
 * Copyright (c) 2013-2015 rchockxm (rchockxm.silver@gmail.com)
 *
 * Licensed - under the terms of the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
 
function NumericLimits(sender, limit_number, callback_func) {
    var ret = false;
    var user_select = (window.getSelection) ? window.getSelection() : "";
    
    if (typeof sender !== "object") {
        return ret;
    }
    
    if (user_select == "") {
        if (document.getSelection != null && document.getSelection != undefined) {
            user_select = document.getSelection();
        }
        if (user_select == "") {
            if (document.selection != null && document.selection != undefined) {
                user_select = window.document.selection.createRange().text;
            }
        }
    }
    
    var user_select_pos = sender.value.indexOf(user_select);
    var user_force_pos = (sender.selectionStart) ? sender.selectionStart : "";
    
    if (user_force_pos == "" || user_force_pos == null || user_force_pos == undefined) {
        if (document.selection) {
            sender.focus();
            
            var c_r = document.selection.createRange();
            var c_re = sender.createTextRange();
            var c_rc = c_re.duplicate();
            
            c_re.moveToBookmark(c_r.getBookmark());
            c_rc.setEndPoint("EndToStart", c_re);
            user_force_pos = c_rc.text.length;
        }
    }
    
    var KeyCode = window.event.keyCode;
    
    if (KeyCode >= 48 && KeyCode <= 57) {
        var new_value = parseInt(KeyCode - 48);
        var old_value = sender.value;
        
        if (user_select != "") {
           old_value = sender.value.replace(user_select, "");
        }

        var global_value = parseFloat(old_value + new_value);
        
        if (global_value <= limit_number) {
            ret = true;
        } 
        else {
            if (typeof callback_func === "function") {
                callback_func(sender, global_value, limit_number);
            }
        }
    }
    else {
        var old_value = sender.value;
        
        if ((user_select != "" && user_select_pos > 0) || (user_force_pos >= 1)) {            
            if (KeyCode == 46 && (old_value.split(".").length-1 == 0)) {
                ret = true;
            }
        }
    }

    return ret;
}

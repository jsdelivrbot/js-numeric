/*
 * js-numeric - 2.00
 * Copyright (c) 2013-2015 rchockxm (rchockxm.silver@gmail.com)
 *
 * Licensed - under the terms of the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
 
function JsNumeric(targetParams) {
    var ret = false;
    var gThis = this;
    
    var params = {
        target: "",
        callback: null,
        limit: {
            max: null,
            min: null
        }
    };
    
    if (typeof targetParams === "object" && targetParams !== null) {
        params.target = (typeof targetParams['target'] === "object") ? targetParams['target'] : params.target;
        params.callback = (typeof targetParams['callback'] === "function") ? targetParams['callback'] : params.callback;
        
        if (typeof targetParams['limit'] === "object") {
            params.limit.max = (typeof params.limit['max'] === "number") ? params.limit['max'] : params.limit.max;
            params.limit.min = (typeof params.limit['min'] === "number") ? params.limit['min'] : params.limit.min;
        }
        
        if (typeof targetParams['limit'] === "string") {
            var limitStr = targetParams['limit'].split(",");
            
            if (limitStr.length == 2) {
                params.limit.max = parseFloat(limitStr[1]);
                params.limit.min = parseFloat(limitStr[0]);
            }
        }
    }
    
    if (typeof params.target === "object" && params.target !== null) {
        if (typeof params.target.addEventListener === "function") {
            params.target.addEventListener("keypress", function(){
                var result = gThis.setLimit(params.target, params.limit, params.callback);
            });
        }
        else {
            if (typeof params.target.attachEvent === "object" && params.target.attachEvent !== null) {
                params.target.attachEvent("onkeypress", function(){
                    var result = gThis.setLimit(params.target, params.limit, params.callback);
                });
            }
        }
        
        ret = true;
    }
    
    this.setLimit = function (sender, limit, callback) {
        var ret = false;
        
        if (typeof sender !== "object" || typeof limit !== "object") {
            return ret;
        }
        
        var userSelection = (typeof window.getSelection === "function") ? window.getSelection() : null;
        
        if (userSelection === null) {
            if (document.getSelection != null && document.getSelection != undefined) {
                userSelection = document.getSelection();
            }
            
            if (userSelection === null) {
                if (document.selection != null && document.selection != undefined) {
                    userSelection = window.document.selection.createRange().text;
                }
            }
        }
        
        var userSelectPos = sender.value.indexOf(userSelection);
        var userForcePos = (typeof sender.selectionStart === "number") ? sender.selectionStart : null;
        
        if (userForcePos === null) {
            if (typeof document.selection === "object") {
                sender.focus();
                
                var docSelRange = document.selection.createRange();
                var senderTextRange = sender.createTextRange();
                var senderDuplicate = senderTextRange.duplicate();
                
                senderTextRange.moveToBookmark(docSelRange.getBookmark());
                senderDuplicate.setEndPoint("EndToStart", senderTextRange);
                userForcePos = senderDuplicate.text.length;
            }
        }
        
        var numMax = null;
        var numMin = null;
        
        if (typeof limit === "object") {
            numMax = (typeof limit['max'] === "number") ? parseFloat(limit.max) : numMax;
            numMin = (typeof limit['min'] === "number") ? parseFloat(limit.min) : numMin;
        }
        
        var dwKeyCode = parseInt(window.event.keyCode);
        
        if (dwKeyCode >= 48 && dwKeyCode <= 57) {
            var newValue = parseInt(dwKeyCode - 48);
            var oldValue = sender.value;
            
            if (userSelection != null) {
                oldValue = sender.value.replace(userSelection, "");
            }
            
            var globalSuccess = false;
            var globalMax = false;
            var globalValue = parseFloat(oldValue + newValue);
            
            if (typeof numMax === "number") {
                if (globalValue <= numMax) {
                    globalMax = true;
                    globalSuccess = true;
                }
            }
            
            if (typeof numMin === "number") {
                if (globalValue > numMin || (globalValue < 10 && globalValue < numMin)) {
                    if (globalMax === true) {
                        globalSuccess = true;
                    }
                }
            }
            
            if (globalSuccess === false) {
                if (typeof callback === "function") {
                    callback(sender, globalValue, limit);
                }
            }
            
            ret = globalSuccess;
        }
        else {
            var oldValue = sender.value;
            
            if ((userSelection != null && userSelectPos == 0) || (userForcePos == 0)) {
                if (typeof numMax === "number") {
                    if (dwKeyCode == 43 && numMax >= 0 && (oldValue.split("+").length - 1 == 0)) {
                        ret = true;
                    }
                }
                
                if (typeof numMin === "number") {
                    if (dwKeyCode == 45 && numMin < 0 && (oldValue.split("-").length - 1 == 0)) {
                        ret = true;
                    }
                }
            }
            
            if ((userSelection != null && userSelectPos > 0) || (userForcePos >= 1)) {
                if (dwKeyCode == 46 && (oldValue.split(".").length - 1 == 0)) {
                    ret = true;
                }
            }
        }
        
        if (ret === false) {
            if (typeof event.preventDefault === "function") {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        }
        
        return ret;
    }
    
    return ret;
}

sap.ui.define(
  [], function () {
    "use strict";

    return {

      hasOwnProp: function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      },

      isPresent: function (input) {
        return !(this.isNull(input) || this.isUndefined(input));
      },

      isEmptyObject: function (input) {
        return Object.keys(input).length === 0 && input.constructor === Object
      },

      isNull: function (value) {
        return value == null;
      },

      _isUndefined: function (value) {
        return (typeof value === "undefined");
      },


      isUndefined: function (input) {
        return input === void 0;
      },

      isNumber: function (input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
      },

      isDate: function (input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
      },

      isArray: function (input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
      },

      isObject: function (input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
      },

      isFunction: function (input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
      },

      isNotEmptyArray: function (input) {
        return !!(this.isArray(input) && input.length > 0);
      }


    }


  });

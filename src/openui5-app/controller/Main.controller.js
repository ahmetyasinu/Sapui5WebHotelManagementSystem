sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
  "use strict";

  var self = Object.create(null);

  return BaseController.extend("app.controller.Main", {

    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("main").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {
    },
    onPress:function () {
      this.getRouter().navTo("roombooking");

    },
    onReport:function () {
      this.getRouter().navTo("report");

    }


  });
});

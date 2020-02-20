sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "app/libs/voca"
], function (BaseController, JSONModel, Filter, FilterOperator,Voca) {
  "use strict";

  var self = Object.create(null);

  let loginModel = new JSONModel();


  return BaseController.extend("app.controller.Login", {

    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("login").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {
      this.clearModels();
      this.setModels();
    },

    clearModels: function () {
      loginModel.setData({});
    },

    setModels: function () {
      let oView = this.getView();
      oView.setModel(loginModel, "login");
    },


    onLogin: function () {

      let userData  = loginModel.getData();

      if ( Voca.isBlank(userData.username)){
        return;
      }
      this.getOwnerComponent().getModel("currentUser").setData(userData.username);
      this.getRouter().navTo("main");
    }


  });
});

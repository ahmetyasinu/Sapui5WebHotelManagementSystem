sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/HotelService"
], function (BaseController, JSONModel,HotelService) {
  "use strict";

  var self = Object.create(null);
  let reportModel=new JSONModel();
  let hotelService = new HotelService;

  return BaseController.extend("app.controller.Report", {

    onInit: function () {
      self=this;
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("report").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {
      self.clearModels();
      self.getData();
      self.setModels();
    },

    clearModels: function () {
      reportModel.setData({});
    },
    turn:function(){
      self.getRouter().navTo("main");
    },

    setModels: function () {
      let oView = this.getView();
      oView.setModel(reportModel, "report");
    },
    getData:function () {
      hotelService.findReport(
        function (response) {
          reportModel.setSizeLimit(response.data.length);
          reportModel.setData(response.data);
        },

        function (error) {
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");

        }
      )

    }


  });
});

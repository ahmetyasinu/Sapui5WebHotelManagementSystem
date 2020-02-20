sap.ui.define([
  'app/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'app/service/HotelService',
  'app/service/RoomTypeService',
  'app/service/RoomService'
], function (BaseController, JSONModel, HotelService, RoomTypeService, RoomService) {
  "use strict";

  var self = Object.create(null);
  let updateModel = new JSONModel();
  let hotelService = new HotelService;
  let roomTypeService = new RoomTypeService;
  let roomService = new RoomService;
  let roomTypeModel = new JSONModel();
  let id = null;
  let roomModel = new JSONModel();


  return BaseController.extend("app.controller.Update", {

      onInit: function () {
        self = this;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("update").attachPatternMatched(this.onRouteMatched, this);
      },


      onRouteMatched: function (oEvent) {
        id = oEvent.getParameter("arguments").invoicePath;
        self.clearModels();
        self.setModels();
        self.initReservationById(id);
        self.initModels();
        console.log(id);
      },
      initModels: function () {

        roomTypeService.findAll(
          function (response) {
            roomTypeModel.setSizeLimit(response.data.length);
            roomTypeModel.setData(response.data);
            // roomBookingModel.setProperty("/roomTypeId", 0);
          },
          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");
          }
        );
      },

      clearModels: function () {
        updateModel.setData({});
        roomTypeModel.setData({});
        roomModel.setData({});
      },

      setModels: function () {
        let oView = this.getView();
        oView.setModel(updateModel, "update");
        oView.setModel(roomTypeModel, "roomTypes");
        oView.setModel(roomModel, "rooms");
      },


      turn: function () {
        self.getRouter().navTo("roombooking");

      },
      initReservationById: function (id) {
        // let dashboardMockData = jQuery.sap.getModulePath("app", "/") + "model/travels.json";
        // travellerModel.loadData(dashboardMockData);


        hotelService.findById(
          id,
          function (response) {
            updateModel.setData(response.data);
            console.log(updateModel);
            roomService.findByRoomType(updateModel.getData().roomTypeId,
              function (response) {
                roomModel.setData(response.data);
              },
              function (error) {
                alert("Başarısız");
                sap.m.MessageToast.show("Başarısız");

              }
            );
          },

          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

          }
        );


      }, updateRoomList: function (oEvent) {
        let item = oEvent.getParameter("selectedItem");
        roomService.findByRoomType(item.getKey(),
          function (response) {
            roomModel.setData(response.data);
          },
          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

          }
        );

      },
      getReservation: function () {
        hotelService.update(id, updateModel.getData(),
          function (response) {
            updateModel.setSizeLimit(response.data.length);
            updateModel.setData(response.data);
          },

          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

          }
        );

      }

    }
  );
});

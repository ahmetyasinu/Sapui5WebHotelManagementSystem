sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/HotelService",
  "app/service/RoomTypeService",
  "app/service/RoomService",
  "sap/m/Button",
  "sap/m/Dialog",
  "sap/m/Text",
  "sap/m/library"

], function (BaseController, JSONModel, HotelService, RoomTypeService, RoomService, Button, Dialog, Text, mobileLibrary) {
  "use strict";
  var ButtonType = mobileLibrary.ButtonType;
  var self = Object.create(null);


  let roomBookingModel = new JSONModel();
  let roomModel = new JSONModel();
  let roomTypesModel = new JSONModel();


  let hotelService = new HotelService;
  let roomTypeService = new RoomTypeService;
  let roomService = new RoomService;


  return BaseController.extend("app.controller.RoomBooking", {

    onInit: function () {
      self = this;
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("roombooking").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {
      this.clearModels();
      this.setModels();
      self.initRoomTypes();

    },

    clearModels: function () {
      roomBookingModel.setData({});
      roomTypesModel.setData({});
      roomModel.setData({});
    },

    setModels: function () {
      let oView = this.getView();
      oView.setModel(roomBookingModel, "roomBooking");
      oView.setModel(roomTypesModel, "roomTypes");
      oView.setModel(roomModel, "rooms");
    },

    initRoomTypes: function () {
      roomTypeService.findAll(
        function (response) {
          roomTypesModel.setSizeLimit(response.data.length);
          roomTypesModel.setData(response.data);
          // roomBookingModel.setProperty("/roomTypeId", 0);
        },
        function (error) {
          roomTypesModel.setData({});
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");
        }
      );
    },

    onSave: function () {
      hotelService.save(roomBookingModel.getData(),
        function (response) {
          roomBookingModel.setData(response.data);
          sap.m.MessageToast.show("Rezervasyon Kaydedildi.")
          roomBookingModel.setData({});
        },
        function (error) {
          if (error.response.data.errors)
            self.onMessageSuccessDialogPress(error);

          else if (error.response.data.message)
            self.oMessageSuccessDialogPress(error)
        }
      );


    },
    reservationList: function () {
      this.getRouter().navTo("myreservation");
    },
    operationUpdate: function (startDate, endDate, key) {
      if (startDate && endDate && key && startDate != "" && endDate != "" && key != "") {
        hotelService.operationUpdate(startDate, endDate, key
          , function (response) {
            roomBookingModel.setProperty('/sumPrice', response.data)
          },
          function (error) {
            roomBookingModel.setProperty('/sumPrice', null)
            sap.m.MessageToast.show(error.response.data.message);

          })
      }
    },
    onMessageSuccessDialogPress: function (error) {

      var oDialog = new Dialog({
        title: 'Error',
        type: 'Message',
        state: 'Error',
        content: new Text({
          text:error.response.data.errors[0].defaultMessage
        }),
        beginButton: new Button({
          type: ButtonType.Emphasized,
          text: 'OK',
          press: function () {
            oDialog.close();
          }
        }),
        afterClose: function () {
          oDialog.destroy();
        }
      });

      oDialog.open();
    },
    oMessageSuccessDialogPress: function (error) {

      var oDialog = new Dialog({
        title: 'Error',
        type: 'Message',
        state: 'Error',
        content: new Text({
          text:error.response.data.message
        }),
        beginButton: new Button({
          type: ButtonType.Emphasized,
          text: 'OK',
          press: function () {
            oDialog.close();
          }
        }),
        afterClose: function () {
          oDialog.destroy();
        }
      });

      oDialog.open();
    },


    updateRoomList: function (oEvent) {
      let item = oEvent.getParameter("selectedItem");
      roomService.findByRoomType(item.getKey(),

        function (response) {
          roomModel.setData(response.data);
        },
        function (error) {
          roomModel.setData({});
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");

        }
      );
      let startDate = self.getView().byId("startDateId").getValue();
      let endDate = self.getView().byId("endDateId").getValue();
      let selectedRoomType = self.getView().byId("selectRoomTypeId");
      let key = selectedRoomType.getSelectedKey();


      self.operationUpdate(startDate, endDate, key);


    },
    changeStartDate: function (oEvent) {
      let startDate = oEvent.getParameter("value");
      let endDate = self.getView().byId("endDateId").getValue();
      let selectedRoomType = self.getView().byId("selectRoomTypeId");
      let key = selectedRoomType.getSelectedKey();
      self.operationUpdate(startDate, endDate, key);

    }
    ,

    changeEndDate: function (oEvent) {
      let startDate = self.getView().byId("startDateId").getValue();
      let endDate = oEvent.getParameter("value");
      let selectedRoomType = self.getView().byId("selectRoomTypeId");
      let key = selectedRoomType.getSelectedKey();

      self.operationUpdate(startDate, endDate, key);


    }


  });
});

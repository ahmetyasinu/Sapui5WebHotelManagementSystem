sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/HotelService",
  "app/service/RoomTypeService",
  "app/service/RoomService"

], function (BaseController, JSONModel, HotelService, RoomTypeService, RoomService) {
  "use strict";

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
          alert("başarılı");
        },
        function (error) {
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");
        }
      );


    },
    reservationList: function () {
      this.getRouter().navTo("myreservation");
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


      if ( startDate != null || startDate != undefined || startDate != "")


      if (endDate != "" && startDate != "") {
        let selectedRoomType = self.getView().byId("selectRoomTypeId");
        let key = selectedRoomType.getSelectedKey();
        let price;
        let startDateObject = new Date(startDate);
        let endDateObject = new Date(endDate);
        roomTypesModel.getData().forEach(type => {
          if (key == type.id) {
            price = type.price;
          }
        });
        const diffTime = Math.abs(endDateObject - startDateObject);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        console.log(typeof price);
        let sumPrice = (price * diffDays);
        roomBookingModel.setProperty('/sumPrice', sumPrice);
      }


    },
    changeStartDate: function (oEvent) {
      let startDate = oEvent.getParameter("value");
      let endDate = self.getView().byId("endDateId").getValue();
      let selectedRoomType = self.getView().byId("selectRoomTypeId");
      let key = selectedRoomType.getSelectedKey();

      if (endDate != "" && key != "") {
        let price;
        let startDateObject = new Date(startDate);
        let endDateObject = new Date(endDate);
        roomTypesModel.getData().forEach(type => {
          if (key == type.id) {
            price = type.price;

          }

        });
        const diffTime = Math.abs(endDateObject - startDateObject);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        console.log(typeof price);
        let sumPrice = (price * diffDays);
        roomBookingModel.setProperty('/sumPrice', sumPrice);
      }

    },

    changeEndDate: function (oEvent) {
      let startDate = self.getView().byId("startDateId").getValue();
      let endDate = oEvent.getParameter("value");
      let selectedRoomType = self.getView().byId("selectRoomTypeId");
      let key = selectedRoomType.getSelectedKey();
      if (startDate != "" && key != "") {
        let price;
        let startDateObject = new Date(startDate);
        let endDateObject = new Date(endDate);
        roomTypesModel.getData().forEach(type => {
          if (key == type.id) {
            price = type.price;

          }

        });
        const diffTime = Math.abs(endDateObject - startDateObject);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let sumPrice = (price * diffDays);
        roomBookingModel.setProperty('/sumPrice', sumPrice);
      }
    }


  });
});

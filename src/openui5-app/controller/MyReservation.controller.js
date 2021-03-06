sap.ui.define([
  'app/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'app/service/HotelService',
  "sap/ui/model/Filter"
], function (BaseController, JSONModel, HotelService) {
  "use strict";

  var self = Object.create(null);
  let id = Object.create(null);


  let reservationModel = new JSONModel();
  let hotelService = new HotelService;


  return BaseController.extend("app.controller.MyReservation", {

      onInit: function () {
        self = this;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("myreservation").attachPatternMatched(this.onRouteMatched, this);
      },


      onRouteMatched: function () {
        self.clearModels();
        self.setModels();
        self.getReservation();
      },

      clearModels: function () {
        reservationModel.setData({});
      },

      setModels: function () {
        let oView = this.getView();
        oView.setModel(reservationModel, "reservation");
      },
      update: function (oEvent) {
        let selectedRow = oEvent.getSource().getBindingContext("reservation").getObject();
        self.getRouter().navTo('update', {
          invoicePath: selectedRow.rezervationId
        });
      },


      turn: function () {
        self.getRouter().navTo("roombooking");

      },
      onSearch: function (oEvent) {
        let sQuery = oEvent.getSource().getValue();
        if (sQuery) {
          hotelService.findByNameSurname(sQuery,
            function (response) {
              reservationModel.setSizeLimit(response.data.length);
              reservationModel.setData(response.data);
            },

            function (error) {
              alert("Başarısız");
              sap.m.MessageToast.show("Başarısız");

            }
          );
        } else if(!sQuery) {
          self.getReservation();
        }


      }
      ,
      getReservation: function () {
        hotelService.findAll(function (response) {
            reservationModel.setSizeLimit(response.data.length);
            reservationModel.setData(response.data);
            console.log(reservationModel);
          },

          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

          }
        );

      },
    deleteReservation:function (oEvent) {
      let selectedRow = oEvent.getSource().getBindingContext("reservation").getObject();
      hotelService.delete(
        selectedRow.rezervationId,

          function (response) {
            self.getReservation();
            alert("Güncelleme Başarıyla Yapıldı.");
            location.reload();
          },

          function (error) {
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

          })

    }

    }
  );
});

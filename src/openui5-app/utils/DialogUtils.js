sap.ui.define(
  ['sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text'
  ],
  function (Button, Dialog, Text) {
    "use strict";

    return {

      information: function (text) {
        let dialog = new Dialog({
          title: 'Bilgi',
          type: 'Message',
          state: 'Information',
          content: new Text({
            text: text
          }),
          beginButton: new Button({
            text: 'Tamam',
            press: function () {
              dialog.close();
            }
          }),
          afterClose: function () {
            dialog.destroy();
          }
        });

        dialog.open();
      },


      error: function (text) {
        let dialog = new Dialog({
          title: 'Hata',
          type: 'Message',
          state: 'Error',
          content: new Text({
            text: text,
          }),
          beginButton: new Button({
            text: 'Tamam',
            press: function () {
              dialog.close();
            }
          }),
          afterClose: function () {
            dialog.destroy();
          }
        });

        dialog.open();
      },


      success: function (text) {
        let dialog = new Dialog({
          title: 'Başarılı',
          type: 'Message',
          state: 'Success',
          content: new Text({
            text: text
          }),
          beginButton: new Button({
            text: 'Tamam',
            press: function () {
              dialog.close();
            }
          }),
          afterClose: function () {
            dialog.destroy();
          }
        });

        dialog.open();
      },

    };

  });


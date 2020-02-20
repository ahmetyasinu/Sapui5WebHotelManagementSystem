sap.ui.define(
  [
    'sap/ui/model/json/JSONModel',
    "app/utils/VarUtils",
    "app/utils/DialogUtils",
  ],
  function (JSONModel, VarUtils, DialogUtils) {
    "use strict";

    return {

      /**
       *
       * @param response
       * @returns {*}
       */
      addIndex: function (response) {
        if (VarUtils.isPresent(response) && VarUtils.isNotEmptyArray(response)) {
          response.forEach((value, index) => {
            value.index = index + 1;
          });
          return response;
        } else return [];
      },

      errorMessage: function (error) {
        if (error.fieldErrors)
          return this.implementFieldErrors(error);
        else
          DialogUtils.error(error);
      },

      implementFieldErrors: function (error) {
        let errorModel = new JSONModel();

        error.fieldErrors.forEach(el => {
          let field = "/" + el.field;
          let fieldMessage = "/" + el.field + "ErrorMessage";

          errorModel.setProperty(field, "Error");
          errorModel.setProperty(fieldMessage, el.message);
        });

        DialogUtils.error("Lütfen girilen verileri kontrol ediniz");

        return errorModel.getData();
      },

    };

  });


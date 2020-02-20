sap.ui.define(
  [
    'app/utils/VarUtils'
  ],
  function (VarUtils) {
    "use strict";

    return {

      close: function (self, fragmentId,...args
  )
    {
      let oView = self.getView();
      let oDialog = oView.byId(fragmentId);
      if (VarUtils.isPresent(oDialog)) {
        oDialog.close();
      }
    }
  ,


  }
    ;

  });


/* @flow */

sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/model/json/JSONModel',
    'app/model/formatter'
  ],
  function(Controller, History, JSONModel, formatter) {
    return Controller.extend('app.controller.BaseController', {
      /* ----------------------------------------------------------- *
       * attributes
       * ----------------------------------------------------------- */

      /**
       * Map with functions to all formatters.
       * @public
       * @type {map}
       */
      formatter: formatter,

      /* ----------------------------------------------------------- *
       * methods
       * ----------------------------------------------------------- */

      /**
       * Go one step back in broser history.
       * @public
       */
      onNavBack() {
        const oHistory = History.getInstance()
        const sPreviousHash = oHistory.getPreviousHash()

        if (sPreviousHash) {
          window.history.go(-1) // go back in history
        } else {
          this.getRouter().navTo('root', {}, true /*no history*/)
        }
      },

      /**
       * Get router of UI Component.
       * @public
       * @returns {sap.m.routing.Router} App Router.
       */
      getRouter() {
        return sap.ui.core.UIComponent.getRouterFor(this)
      },

      /**
       * Get translated Text for sTxt
       * @param {string} [sTxt] i18n text Id.
       * @param {array} [aArgs] Arguments for i18n string.
       * @return {string} i18n translated text
       */
      getText(sTxt, aArgs) {
        return this.getOwnerComponent().getText(sTxt, aArgs)
      },


    })
  }
)

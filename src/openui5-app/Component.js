sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'app/model/models',
    'sap/ui/Device',
    'sap/ui/model/json/JSONModel',
    'app/libs/axios'
  ],
  function(UIComponent, models, Device,JSONModel,axios) {
    return UIComponent.extend('app.Component', {
      metadata: {
        manifest: 'json'
      },

      /* ----------------------------------------------------------- *
       * lifecycle methods
       * ----------------------------------------------------------- */

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments)

        // set the device model
        this.setModel(models.createDeviceModel(), 'device')


        this.attachProgress();

        let currentUserModel = new JSONModel();
        this.setModel(currentUserModel, "currentUser");


        // create the views based on the url/hash
        this.getRouter().initialize()
      },

      /**
       * This method can be called to determine whether the sapUiSizeCompact
       * or sapUiSizeCozy design mode class should be set,
       * which influences the size appearance of some controls.
       * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy'
       * @public
       */
      getContentDensityClass() {
        /*
         * Determine whether the sapUiSizeCompact or sapUiSizeCozy design mode class should be set for this app
         * - sapUiSizeCozy: needed to improve touch behaviour;
         * - sapUiSizeCompact: apply compact mode if touch is not supported;
         * IDEA: this could me made configurable for the user on 'combi' devices with touch AND mouse.
         */
        return Device.support.touch ? 'sapUiSizeCozy' : 'sapUiSizeCompact'
      },


      attachProgress: function () {

        let globalBusyIndicator = new sap.m.BusyDialog();


        axios.interceptors.request.use(function (config) {
          globalBusyIndicator.open();
          return config;
        }, function (error) {
          globalBusyIndicator.close();

        });

        axios.interceptors.response.use(function (response) {
          globalBusyIndicator.close();

          return response;
        }, function (error) {
          globalBusyIndicator.close();

          // Do something with response error
          return Promise.reject(error);
        });
      }




    })
  }
)

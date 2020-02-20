sap.ui.define(
  [
    'app/config/env',
    'sap/ui/base/Object',
    'app/libs/axios'
  ],
  function (env, BaseObject, axios) {
    'use strict';


    return BaseObject.extend('app.service.RoomService', {

      constructor: function () {
        this.url = env.baseUrl + 'room';
      },
      save: function (data, fnSuccess, fnError) {
        axios.post(this.url, data)
          .then(fnSuccess)
          .catch(fnError);
      },

      findAll: function (fnSuccess, fnError) {
        axios.get(this.url)
          .then(fnSuccess)
          .catch(fnError);
      },
      findByRoomType: function (id, fnSuccess, fnError) {
        axios.get(this.url + '/type/' + id)
          .then(fnSuccess)
          .catch(fnError);

      }

    })


  });

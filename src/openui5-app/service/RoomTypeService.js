sap.ui.define(
  [
    'app/config/env',
    'sap/ui/base/Object',
    'app/libs/axios'
  ],
  function (env, BaseObject, axios) {
    'use strict';


    return BaseObject.extend('app.service.RoomTypeService', {

      constructor: function () {
        this.url = env.baseUrl + 'room-type';
      },
      save: function(data,fnSuccess,fnError){
        axios.post(this.url , data)
          .then(fnSuccess)
          .catch(fnError);
      },
      update:function(id,data,fnSuccess,fnError){
        axios.put(this.url + '/update/'+id, data)
          .then(fnSuccess)
          .catch(fnError);
      },
      delete:function(id,fnSuccess,fnError){
        axios.delete(this.url+'/delete/'+id)
          .then(fnSuccess)
          .catch(fnError);
      },


      findAll: function (fnSuccess, fnError) {
        axios.get(this.url )
          .then(fnSuccess)
          .catch(fnError);
      },
      findById:function (id,fnSuccess,fnError) {
        axios.get(this.url+'/update/'+id)
          .then(fnSuccess)
          .catch(fnError);

      }

    })


  });

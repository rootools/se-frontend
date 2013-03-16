
Request = {

  get: function(data, callback) {

    var url = this._url;

    $.ajax({
      url: url,
      type: 'GET',
      crossDomain: true,
      data: data,
      dataType: 'json',
      complete: callback
    });
  },

  post: function(data, callback) {

    var url = this._url;

    $.ajax({
      url: url,
      type: 'POST',
      crossDomain: true,
      data: data,
      dataType: 'json',
      success: callback
    });
  },

  put: function(data, callback) {

    var url = this._url;

    $.ajax({
      url: url,
      type: 'PUT',
      crossDomain: true,
      data: data,
      dataType: 'json',
      success: callback
    });
  },

  _url: "https://192.168.30.155:8091/push"

}

Users = {

  check: function(token) {

    var _this = this;

    Request.get(
      {token: token},
      function(data, status) {

        if (data && _this._response[data.status]) {
          data.token = token;
          _this._response[data.status](data);
        } else {
          _this._response.not_found(data.data);
        }

      }
    );

  },

  create: function(data) {

    var _this = this;

    Request.post(
      data,
      function(data) {
        if (data && _this._response[data.status]) {
          _this._response[data.status](data.data);
        } else {
          _this._response.not_created(data.data);
        }
      }
    );

  },

  update: function(data) {

    var _this = this;

    Request.put(
      data,
      function(data) {
        if (data && _this._response[data.status]) {
          _this._response[data.status](data.data);
        } else {
          _this._response.not_updated(data.data);
        }
      }
    );

  },

  _response: {

    not_found: function(data) {
      //DrawColorPicker();
      console.log('not_exist');
      DrawColorPicker();
      $('#login_button').remove();
    },

    not_created: function(data) {
      //DrawColorPicker();
      console.log('not_created');
    },

    not_updated: function(data) {
      console.log('updated');
    }

    exists: function(data) {
      console.log('exist');
      $('#login_button').remove();
    },

    created: function(data) {
      console.log('created');
    },

    updated: function(data) {
      console.log('updated');
    }

  }

}

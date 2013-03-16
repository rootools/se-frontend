
Request = {

  get: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'GET',
      crossDomain: true,
      data: data,
      dataType: 'jsonp',
      complete: callback
    });
  },

  post: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'POST',
      crossDomain: true,
      data: data,
      dataType: 'jsonp',
      success: callback
    });
  },

  put: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'PUT',
      crossDomain: true,
      data: data,
      dataType: 'jsonp',
      success: callback
    });
  },

  _url: "http://localhost:8090"

}

Users = {

  _access_token: null,
  _uid: null,
  _url: "/users",

  check: function(access_token) {

    var _this = this;
    var access_token = access_token ? access_token : this._access_token;

    Request.get(
      _this._url,
      {access_token: access_token},
      function(data, status) {

        if (data && _this._response[data.status]) {
          data.access_token = access_token;
          _this._response[data.status](data);
        } else {
          _this._response.not_found(data.data);
        }

      }
    );

  },

  create: function(data) {

    var _this = this;

    data.access_token = data.access_token ? data.access_token : this._access_token;

    Request.post(
      _this._url,
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

    if (this._access_token) {
      data.access_token = data.access_token ? data.access_token : this._access_token;
    }
    var uid = data.uid ? data.uid : this._uid;
    delete(data.uid);

    var url = this._url + "/" + uid;

    Request.put(
      url,
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
      console.log('not_exist');
      DrawColorPicker();
      $('#login_button').remove();
    },

    not_created: function(data) {
      console.log('not_created');
    },

    not_updated: function(data) {
      console.log('updated');
    },

    exists: function(data) {
      console.log('exist');
      $('#login_button').remove();
    },

    created: function(data) {
      console.log('created');
      DropColorPicker();
    },

    updated: function(data) {
      console.log('updated');
    }

  }

}


Request = {

  get: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      dataType: 'json',
      success: callback
    });
  },

  post: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      success: callback
    });
  },

  put: function(url, data, callback) {

    var url = this._url + url;

    $.ajax({
      url: url,
      type: 'PUT',
      data: data,
      dataType: 'json',
      success: callback
    });
  },

  _url: "http://localhost"

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

    found: function(data) {
      console.log('exist');

      Users._uid = data.uid;
      Teams._color = data.color;

      $('#login_button').remove();

      _se.map.scrollwheel = true;
      _se.map.draggable = true;
      _se.map.disableDoubleClickZoom = false;

      Teams.points();
      setInterval(function() {
        Teams.points();
      }, 5000);
    },

    created: function(data) {
      console.log('created');
      DropColorPicker();
      _se.map.scrollwheel = true;
      _se.map.draggable = true;
      _se.map.disableDoubleClickZoom = false;
    },

    updated: function(data) {
      console.log('updated');
    }

  }

}

Teams = {

  _color: null,
  _url: "/map",

  points: function() {

    var _this = this;

    Request.get(
      _this._url,
      {},
      function (data, status) {
        DrawHeatMap(data);
      }
    );

  }

}

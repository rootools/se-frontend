function RGBtoHEX(rgb) {
  var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

  function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function DrawColorPicker() {
  var html = '<div id="colorPicker">' +
      '<div id="colorPickerTitle">Choose your color</div>' +
      '<div class="color_from_picker" id="color_picker_color_1"></div>' +
      '<div class="color_from_picker" id="color_picker_color_2"></div>' +
      '<div class="color_from_picker" id="color_picker_color_3"></div>' +
      '<div class="color_from_picker" id="color_picker_color_4"></div>' +
      '<div class="color_from_picker" id="color_picker_color_5"></div>' +
      '<div class="color_from_picker" id="color_picker_color_6"></div>' +
      '<div class="color_from_picker" id="color_picker_color_7"></div>' +
      '<div class="color_from_picker" id="color_picker_color_8"></div>' +
      '<div class="color_from_picker" id="color_picker_color_9"></div>' +
      '<div class="color_from_picker" id="color_picker_color_10"></div>' +
      '<div class="color_from_picker" id="color_picker_color_11"></div>' +
      '<div class="color_from_picker" id="color_picker_color_12"></div>' +
    '</div>';
  $('#content').html(html);

  $('.color_from_picker').bind('click', function() {
    var color = RGBtoHEX($(this).css('background-color'));
    Users.create({color: color});
  });
}

function DropColorPicker() {
  $('#colorPicker').remove();
}

function DrawSettingsWindow() {
  var html = '<div id="fieldColorChanger"><center><div id="colorChanger">' +
      '<div id="colorPickerTitle">Change your color</div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_1"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_2"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_3"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_4"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_5"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_6"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_7"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_8"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_9"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_10"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_11"></div>' +
      '<div class="color_from_picker color_from_changer" id="color_picker_color_12"></div>' +
    '</div></center><div id="hideColorChanger"></div></div>';
  $('#content').append(html);

  $('#hideColorChanger').bind('click', function() {
    $('#showColorChanger').css('display', 'block');
    $('#fieldColorChanger').remove();
  });

  $('.color_from_picker').bind('click', function() {
    var color = RGBtoHEX($(this).css('background-color'));
    Users.update({color: color});
  });
}

$(function(){
  setTimeout(function(){
  //DrawSettingsWindow();
},1000);

  $('#showColorChanger').bind('click', function() {
    DrawSettingsWindow();
    $('#showColorChanger').css('display', 'none');
  });

});
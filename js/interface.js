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
  var html = '';
  html += '<div id="colorPicker">';
  html += ' <div id="colorPickerTitle">Choose your color</div>';
  html += ' <div class="color_from_picker" id="color_picker_color_1"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_2"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_3"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_4"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_5"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_6"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_7"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_8"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_9"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_10"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_11"></div>';
  html += ' <div class="color_from_picker" id="color_picker_color_12"></div>';
  html += '</div>';
  $('#content').html(html);

  $('.color_from_picker').bind('click', function() {
    var color = RGBtoHEX($(this).css('background-color'));
    Users.create({color: color});
  });
}
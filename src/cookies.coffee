setCookie = (name, value, expires, path, domain, secure) ->
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "")

getCookie = (name) ->
  cookie = " " + document.cookie
  search = " " + name + "="
  setStr = null
  offset = 0
  end = 0
  if cookie.length > 0
    offset = cookie.indexOf(search)
    if offset != -1
      offset += search.length
      end = cookie.indexOf(";", offset)
      if end == -1
        end = cookie.length
      setStr = unescape(cookie.substring(offset, end))
  setStr

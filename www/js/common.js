function ajax(url, param, type) {
  // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
  // 如果需要的参数更多，比如有跨域dataType需要设置为'jsonp'等等，可以考虑参数设置为对象
  return $.ajax({
    url: url,
    data: param || {},
    type: type || 'GET',
  });
}

function fixedFooter(data) {
  $('footer').find('.copyright').html(data.copyright);
}

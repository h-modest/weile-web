$(function(){
  var query = window.location.search.match(/\d+/g);
  var game_id = query[0];
  if (game_id == 1) {
    $('.game').addClass('selected');
  }
  ajax(''+ config.api_url +'api/games/'+game_id+'').done(function(res) {
  // 成功回调
    if (res.message == "ok") {
      $game = $('.game');
      $download = $game.find('.content-header .download');
      $title = $download.find('.title');
      $download.attr('title', res.data.name);
      $download.find('.game-icon').attr('src','http://' + res.data.icon_url);
      $title.find('h2').html(res.data.name);
      $title.find('.size').html(res.data.size);
      $game.find('.content-header .detail').append(res.data.comment);
      $download.find('.apply-download').attr('href','http://' +res.data.download_url);
      var html = '';
      res.data.renderings.map(function(k){
        html += '<img src="http://'+ k.pic_url +'"/>';
      })
      $game.find('.content .carousel').html(html);
      var game_data = {};
      if (game_id == 2) {
        game_data = {
          width: 524,
          height: 699,
          _width: 89,
          activeWidth: 130,
          activeHeight: 175,
        }
      }
      $('.carousel').rotation(game_data);
    }
  }).fail(function(err) {
  // 失败回调
    console.log(err);
  });
})

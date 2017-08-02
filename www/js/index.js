$(function(){
  $index = $('.index');
  $game = $index.find('.classify-header .class-module');
  $game_list = $index.find('.game-group .listing');
  $game.click(function(){
    var index = $(this).index();
    $game.removeClass('active').eq(index).addClass('active');
    $game_list.removeClass('active').eq(index).addClass('active');
    onPage();
  });

  onPage();

  function pageList($this) {
    $_self= $this;
    $game_btn = $index.find('.game-group .page-btn');
    var step = $_self.find('li').length /2 - 5;
    var maxStep = step;
    if (step>0) {
      $game_btn.eq(1).addClass('active');
      $game_btn.click(function(){
        if ($(this).hasClass('active')) {
          if ($(this).index()) {
            if (step > 0) {
              var _left = parseInt($_self.find('.appear-list').css('margin-left'));
              $_self.find('.appear-list').css('margin-left', _left - 185 + 'px');
              $game_btn.removeClass('active').eq(0).addClass('active');
              step--;
              if (step) {
                setTimeout(function(){
                  $(this).addClass('active');
                }, 500);
              }
            }
          } else {
            if (step < maxStep) {
              var _left = parseInt($_self.find('.appear-list').css('margin-left'));
              $_self.find('.appear-list').css('margin-left', _left + 185 + 'px');
              $game_btn.removeClass('active').eq(1).addClass('active');
              step++;
              if (step < maxStep) {
                setTimeout(function(){
                  $(this).addClass('active');
                }, 500);
              }
            }
          }
        }
      })
    }
  }

  function onPage() {
    $self = $game_list.eq(0);
    if ($self.hasClass('active')) {
      pageList($self);
    } else {
      pageList($game_list.eq(1));
    }
  }

  $index = $('.index');
  $index.find('.game-group .listing a').click(function(event){
    $this = $(this);
    if ($(this).attr('href') == 'javascript:;') {
      $('body').modal({
        msg: '敬请期待!'
      })
    }
  })
})

ajax(''+ config.api_url +'api/companies/1').done(function(res){
  if (res.message == 'ok') {
    fixedFooter(res.data);
  }
}).fail(function(err) {
// 失败回调
  console.log(err);
});

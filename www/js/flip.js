(function($){
  $.fn.extend({
    flip: function(options) {
      var defaults = {
        width: 80,
        height: 80,
        limitNum: 5, //显示默认个数
        offset: 10, //两个图片中间间隔
        isRemarks: false,
      };

      options = $.extend({}, defaults, options);

      var WIDTH = options.width;
      var HEIGHT = options.height;
      var NUM = options.limitNum;
      var OFFSET = options.offset;
      var BORDER = 2;
      var IS_REMARKS = options.isRemarks;
      var btn_top = 0;

      $this = $(this);

      $this.each(function() {
        $_this = $(this);
        var totalWidth = (WIDTH + OFFSET)* NUM;
        var html = '<div class="flip">';
        if (IS_REMARKS) {
          html += '<p class="remarks">参考以下步骤1-'+ $(this).find('img').length +'</p>';
          btn_top = 30;
        }
        html += '<div class="flip-list"><dl>';
        $(this).find('img').each(function(){
          $_self = $(this);
          var active = '';
          if ($_self.index() == 0) {
            active = 'active';
          }
          html += '<dd style="margin-right: '+ OFFSET +'px" class="'+active+'"><img src="'+$_self.attr('src')+'" /></dd>';
        });
        html +='</dl></div>';
        if ($(this).find('img').length - NUM > 0) {
          html +='<div class="flip-btn-group"><span class="flip-btn flip-btn-pre disabled"><i class="fa fa-angle-left"></i>' +
                  '</span><span class="flip-btn flip-btn-next disabled"><i class="fa fa-angle-right"></i></span></div>';
        }
        html +='</div>';
        $_this.html('').html(html);

        $flip = $_this.find('.flip');
        $img = $flip.find('img');
        $btn_group = $flip.find('.flip-btn-group');
        $btn = $flip.find('.flip-btn');
        $flip.find('.flip-list').css({width: totalWidth + 'px', height: HEIGHT + BORDER + 'px'});
        $img.css({width: WIDTH + 'px', height: HEIGHT + 'px'});
        $btn_group.css('top', btn_top + 'px');

        var step = $img.length - NUM;

        if (step>0) {
          var maxStep = step;
          $btn.eq(1).removeClass('disabled');
          $btn.click(function(){
            $_btn = $(this);
            $_flip = $_btn.parents('.flip');
            $_flip_dl = $_flip.find('.flip-list dl');
            $_group = $_flip.find('.flip-btn-group .flip-btn');
            if (!$_btn.hasClass('disabled')) {
              if ($_btn.index()) {
                if (step > 0) {
                  var _left = parseInt($_flip_dl.css('left'));
                  $_flip_dl.css('left', _left - WIDTH - OFFSET + 'px');
                  $_group.addClass('disabled').eq(0).removeClass('disabled');
                  step--;
                  if (step) {
                    setTimeout(function(){
                      $_btn.removeClass('disabled');
                    }, 500);
                  }
                }
              } else {
                if (step < maxStep) {
                  var _left = parseInt($_flip_dl.css('left'));
                  $_flip_dl.css('left', _left + WIDTH + OFFSET + 'px');
                  $_group.addClass('disabled').eq(1).removeClass('disabled');
                  step++;
                  if (step < maxStep) {
                    setTimeout(function(){
                      $_btn.removeClass('disabled');
                    }, 500);
                  }
                }
              }
            }
          })
        }
      })
    }
  })
})(jQuery)

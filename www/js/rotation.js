(function($){
  $.fn.extend({
    rotation: function(options) {
      var defaults = {
        width: 340,
        height: 604,
        limitNum: 5, //显示默认个数
        offset: 10, //两个图片中间间隔
        _width: 60, //小图片高
        activeWidth: 85, //小图片高亮宽
        activeHeight: 150, //小图片高亮高
      };

      options = $.extend({}, defaults, options);

      var _WIDTH = options.width;
      var _HEIGHT = options.height;
      var _LIMITNUM = options.limitNum;
      var _OFFSET = options.offset;
      var _MINWIDTH = options._width;
      var _ACTIVEWIDTH = options.activeWidth;
      var _ACTIVEHEIGHT = options.activeHeight;

      $this = $(this);
      var length = $(this).find('img').length;
      var step = length - _LIMITNUM;
      var maxStep = step;
      var onStep = 0;

      var html = '<div class="rotation"><div class="rotation-list"><dl>';
      var _html = '<div class="thumbnail-list"><ul>';
      $this.find('img').each(function(){
        var active = '';
        if (!$(this).index()) {
          active = 'active';
        }
        html+='<dd class="'+ active +'"><img data-original="'+ $(this).attr('src') +'" class="lazy" src="/image/dotted.png" /></dd>';
        _html+='<li class="'+ active +'"><img data-original="'+ $(this).attr('src') +'" class="lazy" src="/image/dotted.png" /></li>';
      });
      html+='</dl></div>';
      html+='<div class="rotation-group">' +
            '<span class="rotation-btn rotation-btn-pre disabled"></span>' +
            '<span class="rotation-btn rotation-btn-next disabled"></span>' +
            '</div>';
      html+= _html;
      html+='</div>'
      $this.html('').html(html);

      var totalHeight = _HEIGHT * length;
      var min_height = (_HEIGHT - _ACTIVEHEIGHT - (_LIMITNUM - 1)*_OFFSET) / (_LIMITNUM - 1);
      var totalActiveHeight =  min_height * (length - 1) + _ACTIVEHEIGHT + (length - 1)*_OFFSET;
      $rotation = $this.find('.rotation');
      $rotation_group = $rotation.find('.rotation-group');
      $rotation_list = $rotation.find('.rotation-list');
      $rotation_list_dl = $rotation_list.find('dl');
      $thumbnail = $rotation.find('.thumbnail-list');
      $thumbnail_li = $thumbnail.find('li');
      $thumbnail_ul = $thumbnail.find('ul');
      $rotation_list.css({ width: _WIDTH + 'px', height: _HEIGHT + 'px' });
      $rotation_list_dl.css({ width: _WIDTH + 'px', height: totalHeight + 'px' });
      $rotation_list.find('dd').css({width: _WIDTH + 'px', height: _HEIGHT + 'px'});
      $rotation_group.css({ width: _WIDTH + 160 + _MINWIDTH + 'px', height: _HEIGHT + 'px' });
      $thumbnail.css({ width: _ACTIVEWIDTH + 'px', height: _HEIGHT + 'px' });
      $thumbnail_ul.css({ width: _ACTIVEWIDTH + 'px', height: totalHeight + 'px' });
      $thumbnail_li.css({ width: _MINWIDTH + 'px', height: min_height + 'px', 'margin-bottom': _OFFSET + 'px'});

      setTimeout(function() {
          $("img.lazy").each(function(){
            var src = $(this).attr('data-original');
            $(this).attr('src', src);
          })
      }, 2000);

      $rotation_btn = $rotation_group.find('.rotation-btn');

      //缩列图点击事件
      $thumbnail_li.mouseover(function(){
        $_self = $(this);
        $thumbnail_li.removeClass('active');
        $(this).addClass('active');
      });

      $thumbnail_li.mouseleave(function(){
        $_self = $(this);
        $thumbnail_li.removeClass('active');
        $thumbnail_li.eq(onStep).addClass('active');
      })

      $thumbnail_li.click(function(){
        $_self = $(this);
        var index = $_self.index();
        var stepNum = index - onStep;
        onStep = index;
        var _top = parseInt($rotation_list_dl.css('top'));
        $rotation_list_dl.css('top', _top - stepNum * _HEIGHT + 'px');
        if (index) {
          $rotation_btn.eq(0).removeClass('disabled');
          if (index == length - 1) {
            $rotation_btn.eq(1).addClass('disabled');
          }
        } else {
          $rotation_btn.addClass('disabled').eq(1).removeClass('disabled');
        }
      })



      if (length>1) {
        $rotation_btn.eq(1).removeClass('disabled');
      }

      //rotation-btn
      $rotation_btn.click(function(){
        $self = $(this);
        if (!$self.hasClass('disabled')) {
          var top = parseInt($rotation_list_dl.css('top'));
          if ($self.index()) {
            if (onStep>=_LIMITNUM - 1) {
              var _top = parseInt($thumbnail_ul.css('top'));
              $thumbnail_ul.css('top', _top - min_height + 'px');
              step--;
            }
            $rotation_list_dl.css('top', top - _HEIGHT + 'px');
            $rotation_btn.addClass('disabled').eq(0).removeClass('disabled');
            onStep++;
            $thumbnail_li.removeClass('active').eq(onStep).addClass('active');
            if (onStep<length - 1) {
              setTimeout(function(){
                $self.removeClass('disabled');
              }, 500);
            }
          } else {
            if (step < maxStep) {
              var _top = parseInt($thumbnail_ul.css('top'));
              $thumbnail_ul.css('top', _top + min_height + 'px');
              step++;
            }
            $rotation_list_dl.css('top', top + _HEIGHT + 'px');
            $rotation_btn.addClass('disabled').eq(1).removeClass('disabled');
            onStep--;
            $thumbnail_li.removeClass('active').eq(onStep).addClass('active');
            if (onStep>0) {
              setTimeout(function(){
                $self.removeClass('disabled');
              }, 500);
            }
          }
        }
      })
    }
  })
})(jQuery)

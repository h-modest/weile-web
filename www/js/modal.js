(function($){
  $.fn.extend({
    modal: function(options) {
      var defaults = {
        title: '',
        msg: '提醒内容',
        width: 260,
        height: 100,
        direct: 'top',
        offset: 50,
        time: 400,
        disTime: 1500,
        isBtn: false,
        isBtnCancel: false
      };

      options = $.extend({}, defaults, options);

      var TITLE = options.title;
      var MSG = options.msg;
      var WIDTH = options.width;
      var HEIGHT = options.height;
      var DIRECT = options.direct;
      var TIME = options.time;
      var ISBTN = options.isBtn;
      var ISBTNCANCEL = options.isBtnCancel;
      var OFFSET = options.offset;
      var DISTIME = options.disTime;

      $that = $(this);
      var html = '<div class="modal"><div class="modal-group">' +
                '<div class="modal-detail">';
      if (!!TITLE) {
        html+='<p class="modal-title">'+ TITLE +'</p>';
      }
      html+= '<p class="modal-content">'+MSG+'</p>';
      html+='</div>';
      if (ISBTN) {
        html+= '<div class="modal-btn-group"><span class="modal-btn modal-btn-comfirm">确定</span>';
        if (ISBTNCANCEL) {
          html+= '<span class="modal-btn modal-btn-cancel">></span>';
        }
        html+='</div>';
      }
      html+= '</div></div>';

      $that.append(html);
      $modal = $that.find('.modal');
      $that.addClass('modal-in');
      $group = $modal.find('.modal-group');
      $group.css({ width: WIDTH + 'px', height: HEIGHT + 'px', top: -HEIGHT + 'px', left: '50%', transform: 'translateX(-50%)' });
      $group.animate({
        top: OFFSET +'px',
      },TIME);
      if (!TITLE) {
        $group.find('.modal-content').css('line-height', HEIGHT + 'px');
      }

      var removeModal = function() {
        $that.removeClass('modal-in');
        $modal.remove();
      }

      var keyup = function(event){
        if (event.keyCode == 27) {
          removeModal();
          window.removeEventListener('keyup', keyup);
        }
      };

      window.addEventListener('keyup', keyup);

      $modal.click(function(){
        removeModal();
        window.removeEventListener('keyup', keyup);
      });


    }
  })
})(jQuery)

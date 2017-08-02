$(function(){
  $area = $('.area');
  $content = $area.find('.content');
  $area_module_content = $content.find('.module-content');

  $content.find('.module').click(function(){
    $self = $(this);
    var index = $self.index() % 5;
    var _left = 260 + 150*index;
    $module_content = $self.nextAll('.module-content');
    $area_module_content.removeClass('active')
    .find('style').remove();
    $module_content.eq(index).append("<style>.module-content::before{ left:"+ _left +"px }</style>");
    $module_content.eq(index).addClass('active');
  });
})

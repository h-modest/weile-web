$(function(){
  $service = $('.service');
  $answer_content = $service.find('.answer-content');
  $answer_img = $answer_content.find('.text-answer .image-step dd');
  $answer_img.click(function(){
    $_self = $(this);
    $_enlarge = $_self.parents('.answer-content');
    var img = $_self.find('img').attr('src');
    $_enlarge.find('.image-answer img').attr('src',img);
    $answer_img.removeClass('active');
    $_self.addClass('active');
  });
  $service.find('.title').click(function(){
    var index = $(this).index();
    $answer = $(this).parents('.module-field').nextAll('.answer').eq(index);
    if ($answer.hasClass('active')) {
      $answer.removeClass('active');
      $answer.find('.answer-content').removeClass('focus');
    } else {
      $service.find('.answer').removeClass('active');
      $answer.addClass('active');
      if (index === 1) {
        $answer.find('.answer-content').addClass('focus');
      } else {
        $answer.find('.answer-content').removeClass('focus');
      }
    }

  });
})

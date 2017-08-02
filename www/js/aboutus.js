ajax(''+ config.api_url +'api/companies/1').done(function(res){
  if (res.message == 'ok') {
    $aboutus = $('.aboutus');
    $aboutus.find('.content').html(res.data.comment);
  }
}).fail(function(err){
  console.log(err);
})

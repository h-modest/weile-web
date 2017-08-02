// 百度地图API功能
var drawMap = function(title, content){
  // var title ="家乡互动（厦门）网络科技有限公司";
  // var content = '地址：厦门市思明区观音山花莲路11号鸿星尔克集团大厦10楼';
  var map = new BMap.Map("map");
  var point = new BMap.Point(118.203172,24.491576);
  map.centerAndZoom(point, 15);
  var infoWindow = new BMap.InfoWindow();  // 创建信息窗口对象
  var marker = new BMap.Marker(point);  // 创建标注
  map.addOverlay(marker);               // 将标注添加到地图中
  infoWindow.setTitle(title) ;
  infoWindow.setContent(content) ;
  map.openInfoWindow(infoWindow,point); //开启信息窗口
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
  map.addControl(top_left_control);
  map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
}

ajax(''+ config.api_url +'api/companies/1').done(function(res){
  if (res.message == 'ok') {
    var result = res.data;
    $contact = $('.contact');
    $contact_content = $contact.find('.module-content p');
    $contact_content.each(function(){
      $self = $(this);
      var name = $self.attr('data-name');
      $self.find('.text').html(result[name]);
    });
    drawMap(result.name, '地址：' + result.address);
    fixedFooter(result);
  }
}).fail(function(err){
  console.log(err);
});

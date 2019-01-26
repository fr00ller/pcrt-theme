function toggleSidebar(){
  $('.pcrt-sidebar').toggleClass('pcrt-close');
  $('.pcrt-wrapper').toggleClass('pcrt-close');
}

function infiniteScroll(_url){

  $('.pcrt-wrapper-grid').hide();
  $('.loader').show();
  if(window.infScroll !== undefined){
      window.infScroll.destroy();
  }
  $('.pcrt-main-body').html('');
  var elem = document.querySelector('.pcrt-main-body');
  window.infScroll = new InfiniteScroll( elem, {
    path: function() {
        var page = this.pageIndex-1;
        return _url+page;
    },
    append: '.row-item',
    history: false,
  });
  window.infScroll.loadNextPage();
  $('.loader').hide();
  $('.pcrt-wrapper-grid').show();

}

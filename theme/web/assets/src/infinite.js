import InfiniteScroll from 'infinite-scroll';

let infScroll = null;

export class PcrtInfinite {

  // Constructor init private var
  constructor(wrapper, el, appender, loader, urlnext) {
      this.reInit();
  }

  reInit(){
    wrapper.style.display = 'none';
    loader.style.display = 'block';
    infScroll = new InfiniteScroll( el, {
      path: function() {
          let page = this.pageIndex-1;
          return urlnext+page;
      },
      append: appender,
      history: false,
    });
    loader.style.display = 'none';
    wrapper.style.display = 'block';
  }

  next(){
    infScroll.nextPage();
  }

}

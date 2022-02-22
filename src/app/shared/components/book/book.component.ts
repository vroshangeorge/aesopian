import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class BookComponent implements OnInit {

config: any;
  constructor() {
    this.config = {
      bookBlock : jQuery( '#bb-bookblock' ),
      navNext : jQuery( '#bb-nav-next' ),
      navPrev : jQuery( '#bb-nav-prev' ),
      navFirst : jQuery( '#bb-nav-first' ),
      navLast : jQuery( '#bb-nav-last' )
    }
    this.config.bookBlock.bookblock( {
      speed : 1000,
      shadowSides : 0.8,
      shadowFlip : 0.4
    } );                  
    this.init();
   }



initEvents(){    
        
  var slides = this.config.bookBlock.children();

  // add navigation events
  this.config.navNext.on( 'click touchstart', () => {
   this.config.bookBlock.bookblock( 'next' );
    return false;
  } );

  this.config.navPrev.on( 'click touchstart', () => {
    this.config.bookBlock.bookblock( 'prev' );
    return false;
  } );

  this.config.navFirst.on( 'click touchstart', () => {
    this.config.bookBlock.bookblock( 'first' );
    return false;
  } );

  this.config.navLast.on( 'click touchstart', () => {
    this.config.bookBlock.bookblock( 'last' );
    return false;
  } );
  
  // add swipe events
  slides.on( {
    'swipeleft' : function( event: any ) {
      this.config.bookBlock.bookblock( 'next' );
      return false;
    },
    'swiperight' : function( event: any ) {
      this.config.bookBlock.bookblock( 'prev' );
      return false;
    }
  } );

  // add keyboard events
  jQuery( document ).keydown( (e: any) => {
    var keyCode = e.keyCode || e.which,
      arrow = {
        left : 37,
        up : 38,
        right : 39,
        down : 40
      };

    switch (keyCode) {
      case arrow.left:
        this.config.bookBlock.bookblock( 'prev' );
        break;
      case arrow.right:
        this.config.bookBlock.bookblock( 'next' );
        break;
    }
  } );
}

init(){
 

  this.initEvents();
}
  ngOnInit(): void {

        

  }

 

 
}

//   private initBookBlock(): void {
//     var Page = (function() {      
//       var config = {
//         $bookBlock : jQuery( '#bb-bookblock' ),
//         $navNext : jQuery( '#bb-nav-next' ),
//         $navPrev : jQuery( '#bb-nav-prev' ),
//         $navFirst : jQuery( '#bb-nav-first' ),
//         $navLast : jQuery( '#bb-nav-last' )
//       },
//       init = function() {
//         config.$bookBlock.bookblock( {
//           speed : 1000,
//           shadowSides : 0.8,
//           shadowFlip : 0.4
//         } );
//         initEvents();
//       },
//       initEvents = function() {
        
//         var $slides = config.$bookBlock.children();

//         // add navigation events
//         config.$navNext.on( 'click touchstart', function() {
//           config.$bookBlock.bookblock( 'next' );
//           return false;
//         } );

//         config.$navPrev.on( 'click touchstart', function() {
//           config.$bookBlock.bookblock( 'prev' );
//           return false;
//         } );

//         config.$navFirst.on( 'click touchstart', function() {
//           config.$bookBlock.bookblock( 'first' );
//           return false;
//         } );

//         config.$navLast.on( 'click touchstart', function() {
//           config.$bookBlock.bookblock( 'last' );
//           return false;
//         } );
        
//         // add swipe events
//         $slides.on( {
//           'swipeleft' : function( event: any ) {
//             config.$bookBlock.bookblock( 'next' );
//             return false;
//           },
//           'swiperight' : function( event: any ) {
//             config.$bookBlock.bookblock( 'prev' );
//             return false;
//           }
//         } );

//         // add keyboard events
//         jQuery( document ).keydown( function(e: any) {
//           var keyCode = e.keyCode || e.which,
//             arrow = {
//               left : 37,
//               up : 38,
//               right : 39,
//               down : 40
//             };

//           switch (keyCode) {
//             case arrow.left:
//               config.$bookBlock.bookblock( 'prev' );
//               break;
//             case arrow.right:
//               config.$bookBlock.bookblock( 'next' );
//               break;
//           }
//         } );
//       };

//       return { init : init };
  
//     })();
//     Page.init();
//   }
// }

// export class BookComponent implements OnInit {

//   constructor() { }


//   container: any;
//   content: any;
//   bookBlock: any;
//   items: any;
//   current: any;
//   bb: any;
//   navNext: any;
//   navPrev: any;
//   menuItems: any;
//   tblcontents: any;
//   transEndEventNames: any;
//   transEndEventName: any;
//   supportTransitions: any;
//   apiJSP: any;

//   ngOnInit(): void {

//     // <HTMLElement>


//     this.container = $('#container'),

//       // the element we will apply the BookBlock plugin to
//       this.bookBlock = $('#bb-bookblock'),

//       // the BookBlock items (bb-item)
//       this.items = this.bookBlock.children(),

//       // index of the current item
//       this.current = 0,

//       // initialize the BookBlock
//       this.bb = $('#bb-bookblock').bookblock({
//         speed: 800,
//         perspective: 2000,
//         shadowSides: 0.8,
//         shadowFlip: 0.4,
//         // after each flip...
//         onEndFlip: function (old: any, page: any, isLimit: any) {
//           debugger;
//           // update the current value
//           this.current = page;

//           // update the selected item of the table of contents (TOC)
//           this.updateTOC();

//           // show and/or hide the navigation arrows
//           this.updateNavigation(isLimit);

//           // initialize the jScrollPane on the content div for the new item
//           this.setJSP('init');

//           // destroy jScrollPane on the content div for the old item
//           this.setJSP('destroy', old);

//         }
//       }),
//       // the navigation arrows
//       this.navNext = $('#bb-nav-next'),
//       this.navPrev = $('#bb-nav-prev').hide(),

//       // the table of content items
//       this.menuItems = this.container.find('ul.menu-toc > li'),

//       // button to open the TOC
//       this.tblcontents = $('#tblcontents'),

//       this.transEndEventNames = {
//         'WebkitTransition': 'webkitTransitionEnd',
//         'MozTransition': 'transitionend',
//         'OTransition': 'oTransitionEnd',
//         'msTransition': 'MSTransitionEnd',
//         'transition': 'transitionend'
//       },

//       // transition event name
//       this.transEndEventName = this.transEndEventNames[Modernizr.prefixed('transition')],

//       // check if transitions are supported
//       this.supportTransitions = Modernizr.csstransitions;

//     this.init()
//   }

//   init() {

//     // initialize jScrollPane on the content div of the first item
//     this.setJSP('init');
//     this.initEvents();

//   }

//   setJSP(action: any, idx?: any) {

//     const id = idx === undefined ? this.current : idx;
//     this.content = this.items.eq(idx).children('div.content'),
//       this.apiJSP = this.content.data('jsp');

//     if (action === 'init' && this.apiJSP === undefined) {
//       this.content.jScrollPane({ verticalGutter: 0, hideFocus: true });
//     }
//     else if (action === 'reinit' && this.apiJSP !== undefined) {
//       this.apiJSP.reinitialise();
//     }
//     else if (action === 'destroy' && this.apiJSP !== undefined) {
//       this.apiJSP.destroy();
//     }

//   }

//   initEvents() {

//     // add navigation events
//     this.navNext.on('click', function () {
//       debugger;
//       //bb.next();
//       return false;
//     });

//     this.navPrev.on('click', function () {
//       debugger
//       //bb.prev();
//       return false;
//     });

//     // add swipe events
//     this.items.on({
//       'swipeleft': function (event: any) {
//         if (this.container.data('opened')) {
//           return false;
//         }
//         debugger
//         // bb.next();
//         return false;
//       },
//       'swiperight': function (event: any) {
//         if (this.container.data('opened')) {
//           return false;
//         }
//         debugger
//         //  bb.prev();
//         return false;
//       }
//     });

//     // show TOC
//     this.tblcontents.on('click', this.toggleTOC);

//     // click a menu item
//     this.menuItems.on('click', function (e: any) {

//       var el = e.currentTarget,
//         idx = el.index(),
//         jump = function () {
//           //this.bb.jump(idx + 1);
//         };

//       // this.current !== idx ? this.closeTOC(jump) : this.closeTOC();

//       return false;

//     });

//     // reinit jScrollPane on window resize
//     // $(window).on('debouncedresize', function () {
//     //   // reinitialise jScrollPane on the content div
//     //   this.setJSP('reinit');
//     // });

//   }


//   updateNavigation(isLastPage?: any) {

//     if (this.current === 0) {
//       this.navNext.show();
//       this.navPrev.hide();
//     }
//     else if (isLastPage) {
//       this.navNext.hide();
//       this.navPrev.show();
//     }
//     else {
//       this.navNext.show();
//       this.navPrev.show();
//     }

//   }


//   toggleTOC() {
//     var opened = this.container.data('opened');
//     opened ? this.closeTOC() : this.openTOC();
//   }

//   openTOC() {
//     this.navNext.hide();
//     this.navPrev.hide();
//     this.container.addClass('slideRight').data('opened', true);
//   }

//   closeTOC(callback?: any) {

//     this.navNext.show();
//     this.navPrev.show();
//     this.container.removeClass('slideRight').data('opened', false);
//     if (callback) {
//       if (this.supportTransitions) {
//         this.container.on(this.transEndEventName, function () {
//           // $(this).off(transEndEventName);
//           callback.call();
//         });
//       }
//       else {
//         callback.call();
//       }
//     }

//   }
// }

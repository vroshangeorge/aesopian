import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./../../../../assets/plugins/BookBlock/css/jquery.jscrollpane.custom.css',
  './../../../../assets/plugins/BookBlock/css/bookblock.css',
   './slides.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SlidesComponent implements OnInit {

  container: any ;
  bookBlock: any;
  items: any ;
  itemsCount:any ;
  current: any = 0;
  bb: any;
  temp: any;

  _mpanel: any;

  navNext:any;
	navPrev :any;
		menuItems:any;
		tblcontents :any;
		transEndEventNames: any = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		};
		transEndEventName  :any;
		supportTransitions:any;

  constructor() {

    

    
   }

  ngOnInit(): void {

    this.container = jQuery( '#container' );
		this.bookBlock = jQuery( '#bb-bookblock' );
		this.items = this.bookBlock.children();
		this.itemsCount = this.items.length;
		this.current = 0;

    this.navNext = jQuery( '#bb-nav-next' );
		this.navPrev = jQuery( '#bb-nav-prev' ).hide();
		this.menuItems = this.container.find( 'ul.menu-toc > li' );
		this.tblcontents = jQuery( '#tblcontents' );
		this._mpanel = jQuery( '#_mpanel' );

    this.transEndEventName = this.transEndEventNames[Modernizr.prefixed('transition')],
		this.supportTransitions = Modernizr.csstransitions;


    jQuery( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : (old: any, page: any, isLimit: any) =>{
				
				this.current = page;
				// update TOC current
				this.updateTOC();
				// updateNavigation
				this.updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				this.setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				this.setJSP( 'destroy', old );

			}
		} );

    this.temp = this;
    this.setJSP( 'init' );
		this.initEvents();
  }

   initEvents() {

		// add navigation events

    this.navNext.on( 'click touchstart', { passive: true }, (e: any) => {
      this.bookBlock.bookblock( 'next' );
            return false;
          } );

		this.navPrev.on( 'click touchstart', { passive: true }, (e: any) =>{
      this.bookBlock.bookblock( 'prev' );
			return false;
		} );



    jQuery('body').click((evt: any)=>{   
      if(evt.target.id == '_mpanel')
         return;
         if(evt.target.id == 'tblcontents')
         return;
         this.closeTOC();
});
		
		// add swipe events
		this.items.on( {
			'swipeleft'		: ( event : any)=> {
				if( this.container.data( 'opened' ) ) {
					return false;
				}
				this.bookBlock.bookblock( 'next' );
				return false;
			},
			'swiperight'	: ( event: any )=> {
				if( this.container.data( 'opened' ) ) {
					return false;
				}
				this.bookBlock.bookblock( 'prev' );
				return false;
			}
		} , { passive: true });

		// show table of contents
		this.tblcontents.on( 'click', () =>{
      this.toggleTOC(); 
    });

		// click a menu item
		this.menuItems.on( 'click', (e: any)=> {
//debugger
			var el = jQuery( e.currentTarget );
			var	idx = el.index();
			// var	jump = () => {
      // //  debugger
      //   this.bookBlock.bookblock('jump', idx + 1);
			// 	};
		//	debugger
    this.bookBlock.bookblock('jump', idx + 1);
			this.current !== idx ? this.closeTOC(  ) : this.closeTOC();
			//this.current !== idx ? this.closeTOC( jump ) : this.closeTOC();

			return false;
			
		} );

		// reinit jScrollPane on window resize
		jQuery( window ).on( 'debouncedresize', () => {
			// reinitialise jScrollPane on the content div
			 this.setJSP( 'reinit' );
		} );

	}

	 setJSP( action?:any, idx?:any ) {
	//	debugger
		idx = idx === undefined ? this.current : idx;
			var content = this.items.eq( idx ).children( 'div.content' );
      
			var apiJSP = content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

  jumptoPage(pageIndex: any){
    this.bookBlock.bookblock('jump', pageIndex);
  }


	 updateTOC() {
		this.menuItems.removeClass( 'menu-toc-current' ).eq( this.current ).addClass( 'menu-toc-current' );
	}

	 updateNavigation( isLastPage?:any ) {
		
		if( this.current === 0 ) {
			this.navNext.show();
			this.navPrev.hide();
		}
		else if( isLastPage ) {
			this.navNext.hide();
			this.navPrev.show();
		}
		else {
			this.navNext.show();
			this.navPrev.show();
		}

	}

	 toggleTOC() {
   //  debugger
		var opened = this.container.data( 'opened' );
		opened ? this.closeTOC() : this.openTOC();
	}

	 openTOC() {
		this.navNext.hide();
		this.navPrev.hide();
		this.container.addClass( 'slideRight' ).data( 'opened', true );
	}

	 closeTOC( callback?:any ) {

		this.updateNavigation( this.current === this.itemsCount - 1 );
		this.container.removeClass( 'slideRight' ).data( 'opened', false );

    var temp = this;

		// if( callback ) {
		// 	if( this.supportTransitions ) {
		// 		this.container.on( this.transEndEventName, function() {
		// 			 jQuery( temp ).off( temp.transEndEventName );
		// 			callback.call();
		// 		} );
		// 	}
		// 	else {
		// 		callback.call();
		// 	}
		// }

	}
}

// export class SlidesComponent implements OnInit {

//   config: any;

//   constructor() { }

//   ngOnInit(): void {
//     var temp = this;


//     this.config = {
//       bookBlock : jQuery( '#bb-bookblock' ),
//       navNext : jQuery( '#bb-nav-next' ),
//       navPrev : jQuery( '#bb-nav-prev' ),
//       navFirst : jQuery( '#bb-nav-first' ),
//       navLast : jQuery( '#bb-nav-last' )
//     }
//     debugger
//     this.config.bookBlock.bookblock( {
//       speed : 800,
//       shadowSides : 0.8,
//       shadowFlip : 0.7
//     } );

   
    
//       var slides = this.config.bookBlock.children();

//     // add navigation events
//     this.config.navNext.on( 'click touchstart', () => {
//       this.config.bookBlock.bookblock( 'next' );
//       return false;
//     } );

//     this.config.navPrev.on( 'click touchstart', () => {
//       this.config.bookBlock.bookblock( 'prev' );
//       return false;
//     } );

//     this.config.navFirst.on( 'click touchstart', () => {
//       this.config.bookBlock.bookblock().first();
//       return false;
//     } );

//     this.config.navLast.on( 'click touchstart', () => {
//       this.config.bookBlock.bookblock().last();
//       return false;
//     } );
    
//     // add swipe events
//     slides.on( {
//       'swipeleft' : function( event: any ) {
//        // debugger
//         temp.config.bookBlock.bookblock( 'next' );
//         return false;
//       },
//       'swiperight' : function( event: any ) {
//      //   debugger
//         temp.config.bookBlock.bookblock( 'prev' );
//         return false;
//       }
//     } );

//     // add keyboard events
//     jQuery( document ).keydown( (e: any) => {
//       var keyCode = e.keyCode || e.which,
//         arrow = {
//           left : 37,
//           up : 38,
//           right : 39,
//           down : 40
//         };

//       switch (keyCode) {
//         case arrow.left:
//           temp.config.bookBlock.bookblock( 'prev' );
//           break;
//         case arrow.right:
//           temp.config.bookBlock.bookblock( 'next' );
//           break;
//       }
//     } );
//   }

// }

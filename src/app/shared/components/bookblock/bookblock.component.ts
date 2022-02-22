import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var jQuery: any;



@Component({
  selector: 'app-bookblock',
  templateUrl: './bookblock.component.html',
  styleUrls: ['./bookblock.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BookblockComponent implements OnInit {

  constructor() { }

container: any;
bookBlock: any;
items: any;
itemsCount: any;
bb: any;
navNext: any;
navPrev: any;
menuItems: any;
tblcontents: any;
transEndEventNames: any;
current: any;
transEndEventName: any;
supportTransitions: any;

  ngOnInit(): void {
     this.container = jQuery( '#container' ),
		this.bookBlock = jQuery( '#bb-bookblock' ),
		this.items = this.bookBlock.children(),
		this.itemsCount = this.items.length,
		this.current = 0,
		this.bb = jQuery( '#bb-bookblock' );
    this.bb.bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old: any, page: any, isLimit: any) {
				
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
		} );//,
// 		this.navNext = jQuery( '#bb-nav-next' ),
// 		this.navPrev = jQuery( '#bb-nav-prev' ).hide(),
// 		this.menuItems = this.container.find( 'ul.menu-toc > li' ),
// 		this.tblcontents = jQuery( '#tblcontents' ),
// 		this.transEndEventNames = {
// 			'WebkitTransition': 'webkitTransitionEnd',
// 			'MozTransition': 'transitionend',
// 			'OTransition': 'oTransitionEnd',
// 			'msTransition': 'MSTransitionEnd',
// 			'transition': 'transitionend'
// 		},
// 		this.transEndEventName = this.transEndEventNames[Modernizr.prefixed('transition')],
// 		this.supportTransitions = Modernizr.csstransitions;


//    this.init();
  }

  init() {

		// initialize jScrollPane on the content div of the first item
		this.setJSP( 'init' );
		this.initEvents();

	}
	
	initEvents() {

		// add navigation events
		this.navNext.on( 'click', () => {
    //  debugger
			this.bb.bookblock('next');
			return false;
		} );

		this.navPrev.on( 'click', () => {
			this.bb.prev();
			return false;
		} );
		
		// add swipe events
		this.items.on( {
			'swipeleft'		: function( event: any ) {
				if( this.container.data( 'opened' ) ) {
					return false;
				}
				this.bb.next();
				return false;
			},
			'swiperight'	: function( event: any ) {
				if( this.container.data( 'opened' ) ) {
					return false;
				}
				this.bb.prev();
				return false;
			}
		} );

		// show table of contents
		this.tblcontents.on( 'click', this.toggleTOC );

		// click a menu item
		this.menuItems.on( 'click', function() {

			// var el = jQuery( this ),
			// 	idx = el.index(),
			// 	jump = function() {
			// 		bb.jump( idx + 1 );
			// 	};
			
			// current !== idx ? closeTOC( jump ) : closeTOC();

			return false;
			
		} );

		// reinit jScrollPane on window resize
		jQuery( window ).on( 'debouncedresize', () => {
			// reinitialise jScrollPane on the content div
			this.setJSP( 'reinit' );
		} );

	}

	setJSP( action: any, idx?: any ) {
		
		var idx = idx === undefined ? this.current : idx,
			$content = this.items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	updateTOC() {
		this.menuItems.removeClass( 'menu-toc-current' ).eq( this.current ).addClass( 'menu-toc-current' );
	}

	 updateNavigation( isLastPage: any ) {
		
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
		var opened = this.container.data( 'opened' );
		opened ? this.closeTOC() : this.openTOC();
	}

	 openTOC() {
		this.navNext.hide();
		this.navPrev.hide();
		this.container.addClass( 'slideRight' ).data( 'opened', true );
	}

	 closeTOC( callback?: any ) {

		this.updateNavigation( this.current === this.itemsCount - 1 );
		this.container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( this.supportTransitions ) {
				this.container.on( this.transEndEventName, function() {
					//jQuery( this ).off( this.transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}
}

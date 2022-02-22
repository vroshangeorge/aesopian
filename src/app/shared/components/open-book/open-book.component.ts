import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-open-book',
  templateUrl: './open-book.component.html',
  styleUrls: ['./open-book.component.scss']
})
export class OpenBookComponent implements OnInit {

  config: any;
  constructor() { }

  ngOnInit(): void {

var temp = this;


    this.config = {
      bookBlock : jQuery( '#bb-bookblock' ),
      navNext : jQuery( '#bb-nav-next' ),
      navPrev : jQuery( '#bb-nav-prev' ),
      navFirst : jQuery( '#bb-nav-first' ),
      navLast : jQuery( '#bb-nav-last' )
    }

    this.config.bookBlock.bookblock( {
      speed : 800,
      shadowSides : 0.8,
      shadowFlip : 0.7
    } );

   
      this.initEvents();
    
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
      this.config.bookBlock.bookblock().first();
      return false;
    } );

    this.config.navLast.on( 'click touchstart', () => {
      this.config.bookBlock.bookblock().last();
      return false;
    } );
    
    // add swipe events
    slides.on( {
      'swipeleft' : function( event: any ) {
       // debugger
        temp.config.bookBlock.bookblock( 'next' );
        return false;
      },
      'swiperight' : function( event: any ) {
     //   debugger
        temp.config.bookBlock.bookblock( 'prev' );
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
          temp.config.bookBlock.bookblock( 'prev' );
          break;
        case arrow.right:
          temp.config.bookBlock.bookblock( 'next' );
          break;
      }
    } );

    //jQuery('#bb-bookblock').bookblock();
  }

  initEvents () {
						
    
  }
}

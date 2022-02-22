import { Component, OnInit } from '@angular/core';


declare var jQuery: any;

import 'turn.js';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var flipbookEL = jQuery('#flipbook');
    console.log(flipbookEL)
    window.addEventListener('resize', function (e: any) {
      console.log(flipbookEL[0].clientWidth, flipbookEL[0].clientHeight)
      console.log(flipbookEL[0].offsetWidth, flipbookEL[0].offsetHeight)
      
       flipbookEL.style.width = '';
      flipbookEL.style.height = '';


      jQuery(flipbookEL).turn('size', flipbookEL.clientWidth, flipbookEL.clientHeight);
    });


    jQuery('#flipbook').turn({
      width: 800,
      height: 600,
      autoCenter: true
    });

  }

}

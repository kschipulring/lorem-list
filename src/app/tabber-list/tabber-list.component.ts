import { Component, OnInit } from '@angular/core';

import { TabContentsService } from '../tab-contents.service';

@Component({
  selector: 'app-tabber-list',
  templateUrl: './tabber-list.component.html',
  styleUrls: ['./tabber-list.component.scss']
})
export class TabberListComponent implements OnInit {

	tabs: Tab;

  constructor(private tabContentsService: TabContentsService) {
    document.addEventListener('keyup', function(e) {
      if( 9 == (e.keyCode || e.metaKey || e.ctrlKey) ){

        var elems = document.querySelectorAll(".tab");

        [].forEach.call(elems, function(el) {
          el.classList.remove("tabselected");
        });

        document.activeElement.classList.add('tabselected');
      }
    }, false);
  }

  ngOnInit(): void {
  	this.getTabs();
  }

  getTabs(): void {
    this.tabContentsService.getTabs()
    .subscribe(tabs => this.tabs = tabs);
  }

  onKeydown(event, obj): void {
    // Get the <ul> element which is the parent of the tabs
    var theTabs = document.getElementById("theTabs");

    if (event.key === "ArrowUp" ) {

      // Insert this <li> before it's earlier sibling
      theTabs.insertBefore(document.getElementById("tab_" + obj.id), document.getElementById("tab_" + obj.id).previousSibling );
    }

    if (event.key === "ArrowDown" ) {

      // Insert <li> after its next sibling
      theTabs.insertBefore(document.getElementById("tab_" + obj.id), document.getElementById("tab_" + obj.id).nextSibling.nextSibling );
    }

    //refocus the tabbed element
    document.getElementById("a_" + obj.id).focus();
  }

  tabsReset(): void{
    var theTabs = document.getElementById("theTabs");

    var elems = document.querySelectorAll(".li_tab");

    [].forEach.call(elems, function(el) {
      //el.classList.remove("tabselected");

      console.log( "el.id = ", el.id.replace("tab_", "")  );

      var theId = parseInt( el.id.replace("tab_", "") );

      theTabs.insertBefore(el, theTabs.childNodes[ theId ]);
    });
  }
}

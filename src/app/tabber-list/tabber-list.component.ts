import { Component, OnInit } from '@angular/core';

import { Tab } from '../tab';
import { TabContentsService } from '../tab-contents.service';

@Component({
  selector: 'app-tabber-list',
  templateUrl: './tabber-list.component.html',
  styleUrls: ['./tabber-list.component.scss']
})
export class TabberListComponent implements OnInit {

	tabs: Tab[];

  constructor(private tabContentsService: TabContentsService) {
    document.addEventListener('keyup', function(e) {
      if( 9 == (e.keyCode || e.metaKey || e.ctrlKey) ){

        var elems = document.querySelectorAll(".a_tab");

        [].forEach.call(elems, function(el) {
          el.parentElement.classList.remove("selected");
        });

        document.activeElement.parentElement.classList.add('selected');
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

    if ( event.code == "ArrowUp" || event.key == "ArrowUp" ) {

      // Insert this <li> before it's earlier sibling
      theTabs.insertBefore(document.getElementById("li_tab_" + obj.id), document.getElementById("li_tab_" + obj.id).previousSibling );
    }

    if ( ( event.code == "ArrowDown" || event.key == "ArrowDown") &&
    document.getElementById("li_tab_" + obj.id).nextSibling ) {

      // Insert <li> after its next sibling
      theTabs.insertBefore(document.getElementById("li_tab_" + obj.id), document.getElementById("li_tab_" + obj.id).nextSibling.nextSibling );
    }

    //refocus the tabbed element
    document.getElementById("a_tab_" + obj.id).focus();
  }

  tabsReset(): void{
    var theTabs = document.getElementById("theTabs");

    var elems = document.querySelectorAll(".li_tab");

    for( var i=0; i<this.tabs.length; i++ ){
      var theId = "li_tab_" + i;

      var el = document.getElementById( theId );

      //remove the focus from this tab
      el.blur();

      theTabs.insertBefore(el, theTabs.childNodes[ theId ]);

      //remove the focus appearance
      el.classList.remove("selected");
    }
  }
}

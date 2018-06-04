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

  tabsDOM: object;

  currentTab: number;

  //runs as soon as a class instance is on the page
  constructor(private tabContentsService: TabContentsService) {}

  //equivalent of document.ready. always executes after 'constructor' method, when the full document loads
  ngOnInit(): void {
  	this.getTabs();

    document.that = this;

    document.addEventListener('keyup', function(e) {
      if( 9 == (e.keyCode || e.metaKey || e.ctrlKey) ){
        var ct = document.activeElement.parentElement.dataset.tid;

        document.that.tabSwitch( ct );
      }
    }, false);

    //this represents the master ul element, parent to all tabs
    this.tabsDOM = document.getElementById("theTabs");
  }

  getTabs(): void {
    this.tabContentsService.getTabs()
    .subscribe(tabs => this.tabs = tabs);
  }

  tabSwitch(ct):void {
    this.currentTab = parseInt(ct);

    console.log("this.currentTab = ", this.currentTab);
  }

  onKeydown(event, obj): void {
    if ( event.code == "ArrowUp" || event.key == "ArrowUp" ) {

      // Insert this <li> before it's earlier sibling
      this.tabsDOM.insertBefore(document.getElementById("li_tab_" + obj.id),
        document.getElementById("li_tab_" + obj.id).previousSibling );
    }

    if ( ( event.code == "ArrowDown" || event.key == "ArrowDown") &&
    document.getElementById("li_tab_" + obj.id).nextSibling ) {

      // Insert <li> after its next sibling
      this.tabsDOM.insertBefore(document.getElementById("li_tab_" + obj.id),
        document.getElementById("li_tab_" + obj.id).nextSibling.nextSibling );
    }

    //refocus the tabbed element
    document.getElementById("a_tab_" + obj.id).focus();
  }

  tabsReset(): void{
    //var theTabs = document.getElementById("theTabs");

    var elems = document.querySelectorAll(".li_tab");

    for( var i=0; i<this.tabs.length; i++ ){
      var theId = "li_tab_" + i;

      var el = document.getElementById( theId );

      //remove the focus from this tab
      el.blur();

      //push this tab back to its origin point
      this.tabsDOM.insertBefore(el, this.tabsDOM.childNodes[ theId ]);

      //remove the focus appearance
      el.classList.remove("selected");
    }
  }

  //when the onscreen arrow is clicked, this executes
  upClickButton(): void{

  }
}

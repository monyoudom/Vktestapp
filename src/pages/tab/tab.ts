import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {PostPage }from '../post/post';

import {NewfeedsPage} from'../newfeeds/newfeeds';

@Component({
  templateUrl: 'tab.html'
})
export class TabPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any =PostPage;
  tab3Root: any =NewfeedsPage;
  submitAttempt :boolean = false;
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

    
   
  }
}

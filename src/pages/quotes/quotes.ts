import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: {category: string, quotes: Quote[], icon: string};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private quotesService: QuotesService) {
  }

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.addToFavorites(selectedQuote);
          }
        },
        {
          text: 'No, i changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Remove Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to remove the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.removeQuoteFromFavorites(quote);
          }
        },
        {
          text: 'No, i changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });
    alert.present();
  }

  isFavorite(quote: Quote) {
    return this.quotesService.iSQuoteFavorite(quote);
  }

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  //   /*add elvis operator (?) in template to use this approach*/
  // }

}

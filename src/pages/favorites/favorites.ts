import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favQuotes: Quote[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quotesServices: QuotesService,
              private modalController: ModalController,
              private settingsServices: SettingsService) {
  }

  ionViewWillEnter() {
    this.favQuotes = this.quotesServices.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalController.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove){
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    const position = this.favQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.favQuotes.splice(position, 1);
    this.quotesServices.removeQuoteFromFavorites(quote);
    // this.ionViewWillEnter();
  }

  getBackground() {
    return this.settingsServices.getBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}

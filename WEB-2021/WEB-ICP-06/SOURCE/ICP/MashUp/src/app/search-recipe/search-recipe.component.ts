import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  sample: Boolean = false;
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      /**
       * Write code to get recipe
       */
      // tslint:disable-next-line:max-line-length
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=6a0d8754&app_key=3ae0f4f5e57e294bf58fb02720d0ea62&from=0&to=10&calories=591-722&health=alcohol-free').subscribe((recipes: any) => {
          this.sample = recipes.count == 0;
          console.log(this.sample);
          this.recipeList = Object.keys(recipes.hits).map((rec, index) => {
            const recipe = recipes.hits[index].recipe;
            return {name: recipe.label, content: recipe.digest[0].schemaOrgTag, icon: recipe.image, add: recipe.address, url: recipe.url};
          });
        }, error => {
          this.sample = true;
        }
      );

    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      // tslint:disable-next-line:max-line-length
      this._http.get('https://api.foursquare.com/v2/venues/search?client_id=TJQEWOLHPG3IHW1A0JGOK5OPQU1AIR051IQMQPXYMZQAZ4ME' + '&client_secret=ZWZWYRT5DLVPMG2VVWX0OYJYENDHS2O1ITRUWYW1SPH4SG0L&v=20180323&limit=10&near=' + this.placeValue + '&query=' + this.recipeValue).subscribe((restaurants: any) => {
        this.venueList = Object.keys(restaurants.response.venues).map((input, index) => {
          const restaurant = restaurants.response.venues[index];
          return { name: restaurant.name, location: restaurant.location };

        });
      });
    }
  }
}

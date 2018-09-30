import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs-compat/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer asdasda');

    // shorter url, instead of '?auth=' it is params in the options object
    // return this.httpClient.put('https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });

    // progress http
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true,
      // params: new HttpParams().set('auth', token)
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();

    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json?auth=' + token).map(
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json?auth=' + token, {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).map(
      (recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}

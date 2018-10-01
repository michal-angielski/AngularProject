import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';

export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-a8dfe.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
        .map(
          (recipes) => {
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return {
              type: RecipeActions.SET_RECIPES,
              payload: recipes
            };
          }
        );
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}

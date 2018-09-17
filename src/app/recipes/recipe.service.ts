import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel', 'Super-tasty schnitzel', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe('Big fat burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

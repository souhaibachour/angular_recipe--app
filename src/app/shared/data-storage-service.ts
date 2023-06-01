import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-68c91-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((respone) => {
        console.log(respone);
      });
  }

  fetchRecipes() {
    /*
    Reach out to the auth service user, get the currently 
    active value (user) and be done with that.
    Get the user once from authUser and there after I'm done
    by using pipe(take(1))
    */
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-68c91-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          //the second map is an Array map
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

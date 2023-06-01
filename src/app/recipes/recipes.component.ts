import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent implements OnInit {
  //recipeWasSelected!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // this.recipeService.recipeSelectedEvent.subscribe((recipe: Recipe) => {
    //   this.recipeWasSelected = recipe;
    // });
  }
}

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeSelectedEvt = new EventEmitter<Recipe>();
  recipes!: Recipe[];
  private recipesChangedSubscription!: Subscription;
  unsubscribeSignal: Subject<void> = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipesChangedSubscription = this.recipeService.recipeChanged
      .pipe(takeUntil(this.unsubscribeSignal))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    // if (this.recipesChangedSubscription) {
    //   this.recipesChangedSubscription.unsubscribe();
    // }

    this.unsubscribeSignal.next();
    this.unsubscribeSignal.complete();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelectedEvt.emit(recipe);
  // }
}

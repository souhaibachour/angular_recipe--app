import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() inputIndex!: Number;
  // @Output() recipeSelectedEvent = new EventEmitter<void>();

  //constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
  // onSelected() {
  //   //this.recipeSelectedEvent.emit();
  //   this.recipeService.recipeSelectedEvent.emit(this.recipe);
  // }
}

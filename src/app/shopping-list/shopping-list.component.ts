import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  //private ingChangedSubscription!: Subscription;
  unsubscribeSignal: Subject<void> = new Subject<void>();

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChangeddEvent
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe((ingredients: Ingredient[]) => {
        console.log('shopping list subscribe successful');
        this.ingredients = ingredients;
      });
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy(): void {
    // if (this.ingChangedSubscription) {
    //   this.ingChangedSubscription.unsubscribe();
    //   console.log('unsbscribing success');
    // }
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.complete();
    console.log('unsbscribing success');
  }
}

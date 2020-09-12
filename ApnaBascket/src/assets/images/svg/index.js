import React from "react";
import { default as ArrowBack } from './arrow-back';
import { default as ArrowRight } from './arrow-right';
import { default as Cart } from './cart-icon';
import { default as Home } from './home';
import { default as InactiveStar } from './inactive-star';
import { default as More } from './more';
import { default as Star } from './rating-star';
import { default as ReOrder } from './re-order';
import { default as ShoppingList } from './shopping-list-icon';
import { default as ShoppingListNavigator } from './shopping-list-navigator';
import { default as NavigatorStar } from './navigator-star';

export function defineIcon(name, color, width, height) {
  switch (name) {
    case "arrow-right":
      return <ArrowRight style={{ color: color ? color : 'black' }} width={width ? width : 25} height={height ? height : 10} />;
    case "arrow-back":
      return <ArrowBack style={{ color: color ? color : 'black' }} width={width ? width : 25} height={height ? height : 10} />;
    case "star":
      return <Star style={{ color: color ? color : 'yellow' }} width={width ? width : 16} height={height ? height : 16} />;
    case "inactive-star":
      return <InactiveStar style={{ color: color ? color : 'gray' }} width={width ? width : 16} height={height ? height : 16} />;
    case "cart":
      return <Cart style={{ color: color ? color : 'white' }} width={width ? width : 26} height={height ? height : 20} />;
    case "shopping-list":
      return <ShoppingList style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 20} />;
    case "home":
      return <Home style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 22} />;
    case "more":
      return <More style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 20} />;
    case "re-order":
      return <ReOrder style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 20} />;
    case "shopping-list-navigator":
      return <ShoppingListNavigator style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 20} />;
    case "navigator-star":
      return <NavigatorStar style={{ color: color ? color : 'white' }} width={width ? width : 22} height={height ? height : 20} />; 
    default:
      return;
  }
}
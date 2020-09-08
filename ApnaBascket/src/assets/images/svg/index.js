import React from "react";
import { default as ArrowRight } from './arrow-right';
import { default as ArrowBack } from './arrow-back';

export function defineIcon(name, color, width, height) {
  switch (name) {
    case "arrow-right":
      return <ArrowRight style={{ color: color ? color : 'black', }} width={width ? width : 25} height={height ? height : 10} />;
    case "arrow-back":
      return <ArrowBack style={{ color: color ? color : 'black', }} width={width ? width : 25} height={height ? height : 10} />;
    default:
      return;
  }
}
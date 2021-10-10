import { Animation } from "./animation";
import { Position } from "./position";

export interface SpriteData {
    animations: Animations;
    positions: Position[];
    spriteKey: string;
}

export interface Animations {
    static: Animation,
    destroyed: Animation
}
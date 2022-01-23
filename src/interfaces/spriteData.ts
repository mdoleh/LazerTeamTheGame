import { Animation, CompositeAnimation } from "./animation";
import { Position } from "./position";

export interface SpriteData {
    animations: Animations
    positions: Position[]
    spriteKey: string
}

export interface PlayerSpriteData {
    animations: CompositeAnimation
    position: Position
    spriteKey: string
}

export interface Animations {
    [key: string]: Animation
}
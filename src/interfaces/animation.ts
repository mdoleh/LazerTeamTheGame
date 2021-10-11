export interface Animation {
    frameDimensions: FrameDimensions,
    spriteSheetSrc: string,
    spriteSheetKey: string,
    frameCount: number,
    repeat: number
}

export interface FrameDimensions {
    width: number,
    height: number
}

export enum AnimationType {
    STATIC = 'static',
    DESTROYED = 'destroyed'
}
export interface Animation {
    frameDimensions: FrameDimensions,
    spriteSheetSrc: string,
    spriteKey: string,
    frameCount: number
}

export interface FrameDimensions {
    width: number,
    height: number
}
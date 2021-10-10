export interface Animation {
    frameDimensions: FrameDimensions,
    spriteSheetSrc: string,
    key: string,
    frameCount: number
}

export interface FrameDimensions {
    width: number,
    height: number
}
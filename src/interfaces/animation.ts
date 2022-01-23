export interface Animation {
    frameDimensions: FrameDimensions
    spriteSheetSrc: string
    spriteSheetKey: string
    frameCount: number
    frameRate: number
    repeat: number
}

export interface CompositeAnimation {
    components: AnimationComponent[]
    frameDimensions: FrameDimensions
    spriteSheetSrc: string
    spriteSheetKey: string
}

export interface AnimationComponent {
    key: string
    startFrame: number
    endFrame: number
    frameRate: number
    repeat: number
}

export interface FrameDimensions {
    width: number
    height: number
}

export enum AnimationType {
    STATIC = 'static',
    DESTROYED = 'destroyed'
}
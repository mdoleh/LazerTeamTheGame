import { TileMapMetadata } from "../interfaces/tileMapMetadata";

export interface MapResult {
    map: Phaser.Tilemaps.Tilemap,
    layers: Phaser.Tilemaps.TilemapLayer[]
}

export default class TileMapHelper {
    mapImage: TileMapMetadata;
    mapJson: TileMapMetadata;

    constructor(mapImage: TileMapMetadata, mapJson: TileMapMetadata) {
        this.mapImage = mapImage;
        this.mapJson = mapJson;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        load.image(this.mapImage.key, this.mapImage.src);
        load.tilemapTiledJSON(this.mapJson.key, this.mapJson.src);
    }

    create(make: Phaser.GameObjects.GameObjectCreator, mainCamera: Phaser.Cameras.Scene2D.Camera): MapResult {
        const imageName = this.getImageName(this.mapImage.src);
        // must use embedded tilesets in map JSON
        const map = make.tilemap({ key: this.mapJson.key });
        const tiles = map.addTilesetImage(imageName, this.mapImage.key);
        const layers: Phaser.Tilemaps.TilemapLayer[] = [];
        for (let i = 0; i < map.layers.length; ++i) {
            layers.push(map.createLayer(map.layers[i].name, tiles, 0, 0));
        }
        mainCamera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        return { layers, map };
    }

    // extracts the image name without the path & extension
    private getImageName(imageSrc: string) {
        const slashSplit = imageSrc.split('/');
        const dotSplit = slashSplit[slashSplit.length - 1].split('.');
        return dotSplit.slice(0, dotSplit.length - 1).join('.');
    }
}
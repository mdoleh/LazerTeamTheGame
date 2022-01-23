import { SourceKeyPair } from "../interfaces/sourceKeyPair";

export interface MapResult {
    map: Phaser.Tilemaps.Tilemap,
    layers: Phaser.Tilemaps.TilemapLayer[]
}

export default class TileMapGenerator {
    mapImages: { key: SourceKeyPair[] } = {} as { key: SourceKeyPair[] };
    mapJson: SourceKeyPair;

    constructor(mapImages: SourceKeyPair[], mapJson: SourceKeyPair) {
        for (const mapImage of mapImages) {
            this.mapImages[this.getFileName(mapImage.src)] = mapImage;
        }
        this.mapJson = mapJson;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        for (const key in this.mapImages) {
            const mapImage = this.mapImages[key];
            load.image(mapImage.key, mapImage.src);
        }
        load.tilemapTiledJSON(this.mapJson.key, this.mapJson.src);
    }

    create(make: Phaser.GameObjects.GameObjectCreator,
        cache: Phaser.Cache.CacheManager,
        mainCamera: Phaser.Cameras.Scene2D.Camera): MapResult {
        const tileSetMetdata = this.getTileSets(cache);
        // must use embedded tilesets in map JSON
        // can be done in Tiled
        const map = make.tilemap({ key: this.mapJson.key });
        const tileSets: Phaser.Tilemaps.Tileset[] = [];
        for (const metadata of tileSetMetdata) {
            const imageFileName = this.getFileName(metadata.image);
            const mapImageData = this.mapImages[imageFileName];
            if (!mapImageData) {
                console.error('No matching key was found for this image:', metadata.image,
                    '\nMake sure an image matching the filename has been loaded', this.mapImages);
            }
            tileSets.push(map.addTilesetImage(metadata.name, mapImageData.key));
        }
        const layers: Phaser.Tilemaps.TilemapLayer[] = [];
        for (const layer of map.layers) {
            layers.push(map.createLayer(layer.name, tileSets, 0, 0));
        }
        mainCamera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        return { layers, map };
    }

    private getTileSets(cache: Phaser.Cache.CacheManager) {
        return cache.tilemap.entries.entries.map.data.tilesets;
    }

    private getFileName(filePath: string): string {
        const imagePathSplit = filePath.split('/');
        return imagePathSplit[imagePathSplit.length - 1];
    }
}
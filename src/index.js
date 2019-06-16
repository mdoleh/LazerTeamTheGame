import Phaser from "phaser";
import config from "./config";
import BootScene from "./scenes/boot-scene";
import Tutorial from "./scenes/tutorial";

config.scene = [
    BootScene,
    Tutorial
];
const game = new Phaser.Game(config);

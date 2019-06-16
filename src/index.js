import Phaser from "phaser";
import config from "./config";
import BootScene from "./boot-scene";
import Tutorial from "./tutorial";

config.scene = [
    BootScene,
    Tutorial
];
const game = new Phaser.Game(config);

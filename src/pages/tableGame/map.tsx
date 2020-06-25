import React from "react";
import {StorageService} from "../../services/save.local.storage";
import {Keys} from "../../keys";

export class BoardMap {
    storageService = new StorageService();
    spawn = {i: 1, j: 1};
    boardMap = [
        ['*', ' ', '*', ' ', ' ', ' ', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' ', ' ', ' '],
        ['*', 'S', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '5', ' ', ' ', ' ', '6', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', '*', ' ', ' ', 'L', '*', '3', 'L', '*', '*', ' ', '*', '*', ' ', '*', '*', '*', '*', ' ', ' ', 'L', '*'],
        ['*', ' ', '*', ' ', '*', ' ', '*', '*', ' ', ' ', '4', ' ', '*', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', '*', '2', ' ', ' ', '*', ' ', ' ', '*', '*', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'H'],
        ['*', ' ', '*', '*', ' ', ' ', '*', 'L', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' ', ' ', 'H'],
        ['H', ' ', ' ', ' ', ' ', ' ', 'L', ' ', '*', ' ', 'L', ' ', '9', ' ', ' ', '8', ' ', ' ', ' ', '7', ' ', ' ', 'H'],
        ['H', ' ', '1', '#', '#', 'L', 'H', ' ', '*', ' ', '#', ' ', '*', '*', ' ', '*', '*', ' ', ' ', '#', '#', 'L', 'H'],
        ['H', ' ', '#', 'H', 'H', 'L', 'H', '#', 'O', '10', 'H', ' ', ' ', ' ', '*', ' ', ' ', ' ', '#', 'H', 'H', ' ', 'H'],
        ['H', '#', 'H', 'H', 'H', 'H', 'H', 'H', '*', '#', 'H', '#', '#', '#', 'H', '#', '#', '#', 'H', 'H', 'H', 'H', 'H']
    ];

    /**
     * Save the initial map and the initial spawn coordinates.
     * @constructor
     */
    saveInitialMap() {
        this.storageService.set(Keys.MAP, this.boardMap);
        this.storageService.set(Keys.SPAWN, this.spawn);
    }

    getInitialMap() {
        return this.boardMap;
    }

    getInitialSpawn() {
        return this.spawn;
    }

    saveMap(i: number, j: number, value: string) {
        let map = this.storageService.get(Keys.MAP);
        map[i][j] = value;
        this.storageService.set(Keys.MAP, map);
    }

    saveNewSpawn(r: number, c: number) {
        this.spawn.i = r;
        this.spawn.j = c;
        this.storageService.set(Keys.SPAWN, this.spawn);
    }
}
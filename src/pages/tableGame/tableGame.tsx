import React, {useEffect} from 'react';
import './tableGame.scss'
import {StorageService} from "../../services/save.local.storage";
import {Keys} from "../../keys";
import {useHistory} from "react-router-dom";
import {FileDownloader} from "../../services/file.downloader.service";
import {BoardMap} from "./map";
import level from '../../mocks/levels.json';
import {FooterComponent} from "../../components/footer/footer.component";
import {User} from "../../models/user";

const storageService = new StorageService();
const rows = 10;
const columns = 23;
export const TableGame = (props: any) => {

    const history = useHistory();
    const storageService = new StorageService();
    const map = new BoardMap();
    useEffect(() => {
        let user;
        if (user = storageService.get(Keys.USER)) {
            if (user.icon !== "") {
                initializeGame();
            } else {
                setTimeout(() => {
                    alert('No has elegido un autor, por favor elige uno.');
                }, 1000);
                console.log("No se ha elegido autor");
                history.push(Keys.PAGE_CREATE_USER);
            }
        } else {
            setTimeout(() => {
                alert('No has creado un usuario, por favor crea un usuario para jugar.');
            }, 10);
            console.log("No hay usuario")
            history.push(Keys.PAGE_LOGIN);
        }
    }, [])

    const initializeGame = () => {
        //map.saveInitialMap(); //comentar esta línea, pues se usa para cambios de mapa en pruebas.
        let file = new FileDownloader();
        //file.downloadFile('COMPRENSIONLECTORA_1.zip')
        let b = document.body;
        let character = document.getElementById('character');
        let viewBox = document.querySelector('#viewbox');
        let width;
        let height;
        if (character instanceof HTMLElement) {
            width = character.offsetWidth;
            height = character.offsetHeight;
            let fps = 30;
            let allowance = 6;
            let space = 10;
            let columns = 10;
            let rows = 10;
            let p = Math.floor(character.offsetWidth / columns);
            let q = allowance * p;
            let charWidth = width - q;
            if (storageService.get(Keys.IS_CHANGE_INPUT)) {
                let row = storageService.get(Keys.AUX_SPAWN).r;
                let column = storageService.get(Keys.AUX_SPAWN).c;
                changeSpawn(row, column);
            } else if (storageService.get(Keys.IS_CHANGE_INPUT) !== null) {
                setTimeout(() => {
                    alert('No ingresó puntaje para el nivel.')
                }, 1000);
            }
            let mapTable = storageService.get(Keys.MAP);
            let z = new Game(character, viewBox, mapTable, allowance, space, columns, rows,
                charWidth, width, height, fps, history);
            z.initialize();
        }
    }

    const list = () => {
        let list: JSX.Element[] = [];
        let quarters: JSX.Element[] = [];
        for (let i = 0; i < rows; i++) {
            quarters = [];
            for (let e = 0; e < columns; e++) {
                quarters.push(<div key={'s' + e + i} className="col" data-game-col={e}></div>);
            }
            list.push(<div key={'s' + i} className="row" data-game-row={i}>{quarters}</div>)
        }
        return list;
    }


    return <>
        <div className="container-game">
            <div className="screen" id="viewbox">
                {list()}
                <div className="character hide" id="character">
                </div>
            </div>
            {storageService.get(Keys.USER) ? <FooterComponent></FooterComponent> : ""}
        </div>
    </>
}
/**
 * change the spawn by the level coordinates
 * @param r row
 * @param c column
 */
const changeSpawn = (r: number, c: number) => {
    let beforeSpawn: any = storageService.get(Keys.SPAWN);
    let mapLS = new BoardMap();
    mapLS.saveMap(r, c, 'S');
    mapLS.saveMap(beforeSpawn.i, beforeSpawn.j, ' ');
    mapLS.saveNewSpawn(r, c);
    storageService.set(Keys.IS_CHANGE_INPUT, false);
}

class Game {
    private character: HTMLElement;
    private viewbox: Element | any;
    private map: string[][];
    private allowance: number;
    private space: number;
    private columns: number;
    private rows: number;
    private charWidth: number;
    private width: number;
    private height: number;
    private fps: number;
    private left: number;
    private top: number;
    private activeKeyX: any;
    private activeKeyY: any;
    private onLand: boolean;
    private position: { x: number; y: number };
    private jumpSpeed: number;
    private hasEvent: boolean;
    private scroll: number;
    private animation: null;
    private won: boolean;
    private dead: boolean;
    private history: any;
    private open: boolean;
    mapLS = new BoardMap();

    constructor(character: HTMLElement, viewbox: Element | any, map: string[][], allowance: number, space: number,
                columns: number, rows: number, charWidth: number, width: number, height: number, fps: number, history: any) {
        this.character = character;
        this.viewbox = viewbox;
        this.map = map;
        this.allowance = allowance;
        this.space = space;
        this.columns = columns;
        this.rows = rows;
        this.charWidth = charWidth;
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.left = 0;
        this.top = 0;
        this.activeKeyX = null;
        this.activeKeyY = null;
        this.onLand = true;
        this.position = {x: 0, y: 0};
        this.jumpSpeed = 0;
        this.hasEvent = false;
        this.scroll = 0;
        this.animation = null;
        this.won = false;
        this.dead = false;
        this.history = history;
        this.open = false;
    }

    gameWin(row: number, column: number) {
        if (this.won === false) {
            this.won = true;

            setTimeout(() => {
                let total = 0;
                let user = User;
                user = storageService.get(Keys.USER);
                user.score.forEach((element: any) => {
                    total += element.score;
                })
                changeSpawn(row, column);
                storageService.set(Keys.IS_CHANGE_INPUT, true);
                window.location.reload();
                alert('!Felicidades!\nHaz logrado pasar todos los niveles.\nTu puntaje final fue de ' + total);
            }, 1000);
        }
    }

    /**
     * What to do when the user is at the level.
     * @param levelName
     * @param row
     * @param column
     */
    inLevel(levelName: any, row: number, column: number) {
        if (this.dead === false) {
            //this.character.classList.add('dead');
            //this.dead = true;

            //setTimeout(() => {
            //    alert('Está entrando al nivel...');
            //}, 1000);
            //this.map;
            let levelJson = this.selectorLevel(levelName);
            if (!this.open) {
                if (levelJson) {
                    let fileDownloader = new FileDownloader();
                    switch (levelJson.type) {
                        case Keys.TYPE_ZIP:
                            fileDownloader.downloadFile(levelJson.resource);
                            console.log("Es un ZIp");
                            break;
                        case Keys.TYPE_EDUCAPLAY:
                            window.open(levelJson.resource, '_blank', "shilpijain", false);
                            window.focus();
                            console.log("Es una página externa")
                            break;
                        case Keys.TYPE_HTML:
                            if (levelJson.info) {
                                fileDownloader.downloadFile(levelJson.info);
                            }
                            window.open(levelJson.resource, '_blank', "shilpijain", false);
                            window.focus();
                            break;
                        default:
                            console.log("Este tipo de juego no existe");
                            break;
                    }
                    let lvl = Number(levelName);
                    this.history.push({
                        pathname: Keys.PAGE_INPUT_SCORE,
                        state: {level: lvl},
                    });
                    if (!storageService.get(Keys.IS_CHANGE_INPUT)) {
                        storageService.set(Keys.AUX_SPAWN, {r: row, c: column});
                    }
                    this.open = true;
                }
            }
        }
    }


    /**
     * find and return the level in the levels json.
     * @param levelName
     */
    selectorLevel(levelName: string) {
        let levels = level;
        let lvlJson: any;
        levels.forEach((lvl) => {
            if (lvl.level === levelName) {
                lvlJson = lvl;
            }
        })
        return lvlJson;
    }

    changeLvl() {
        this.position.x += 38;
    }

    collidable(o: string) {
        if (o === '*' || o === '#' || o === 'H') {
            return true;
        } else {
            return false;
        }
    }

    collision(c: number, d: string) {
        let x = this.position.x;
        let y = this.position.y;
        let m = this.map;
        let w = this.width;
        let h = this.height;
        let a = this.allowance;
        let s = this.space;
        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;

        if (d === 'u') {
            i = Math.floor((y + h - (s * 2) + 2 + c) / h);
            k = Math.floor((y + h - (s * 2) + 2 + c) / h);
        } else if (d === 'd') {
            i = Math.floor((y + h + c) / h);
            k = Math.floor((y + h + c) / h);
        } else if (d === 'l') {
            j = Math.floor((x + c + (a * 2)) / w);
            l = Math.floor((x + c + (a * 2)) / w);
        } else if (d === 'r') {
            j = Math.floor((x + w + c - (a * 2)) / w);
            l = Math.floor((x + w + c - (a * 2)) / w);
        }

        if (d === 'l' || d === 'r') {
            i = Math.floor((y + h - (s * 2) + 2) / h);
            k = Math.floor((y + h - 1) / h);
        } else if (d === 'u' || d === 'd') {
            j = Math.floor((x + (a * 2)) / w);
            l = Math.floor((x + w - (a * 2) - 1) / w);
        }
        let boxName: string = " ";
        if (i && j) {
            boxName = m[i][j];
            if (boxName) {
                if (boxName === 'X') {
                    console.log("Hola");
                    //this.inLevel("Tipo 1", i, j);
                }
                if (!isNaN(Number(boxName)) && boxName !== ' ') {
                    this.inLevel(boxName, i, j);
                } else if (boxName === 'O') {
                    this.gameWin(i, j);
                }
            }
        }
        try {
            let o = m[i][j];
            let p = m[k][l];


            if (this.collidable(o) || this.collidable(p)) {
                return {
                    x: (j * w),
                    y: (i * h)
                };
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
        return 0;
    }

    moveCharacter(d: number, e: string) {
        let a = this.allowance;
        let w = this.width;
        let o: any;
        o = this.collision(d, e);

        if (o === null) {
            this.position.x += Math.floor(d);
        } else {
            if (e === 'l') {
                this.position.x = Math.floor(o.x) + w - (a * 2);
            } else if (e === 'r') {
                this.position.x = Math.floor(o.x) - w + (a * 2);
            }
        }
    }

    gravity() {
        let h = this.height;
        let s = this.space;
        let f = Math.floor(h * 0.2);
        let g = (this.jumpSpeed >= 0) ? f : this.jumpSpeed;
        let p: any = this.collision(g, 'd');

        if (p === null) {
            this.onLand = false;

            this.position.y += g;
        } else {
            this.position.y = p.y - h;
            this.jumpSpeed = 0;
            this.onLand = true;
        }

        if (this.activeKeyY !== null && g < 0) {
            let o: any = this.collision(g, 'u');

            if (o === null) {
                this.jumpSpeed += (f / 2);
            } else {
                this.jumpSpeed = 0;
                this.position.y = o.y + h - (s * 2) + 2;
            }
        }
    }

    renderCharacter() {
        let c = this.character;
        let icon: string;
        if (storageService.get(Keys.USER)) {
            icon = storageService.get(Keys.USER).icon.icon;
            c.style.backgroundImage = "url(" + icon + ")";
        }
        //console.log(storageService.get(Keys.USER).icon.icon);
        c.style.top = this.position.y + 'px';
        c.style.left = this.position.x + 'px';
    }

    animateCharacter(mode: string) {
        let c = this.character;

        if (mode === 'show') {
            c.classList.add('move');

            let a = this.activeKeyX;

            if (a === 37) {
                c.classList.add('flip');
            } else if (a === 39) {
                c.classList.remove('flip');
            }
        } else if (mode === 'hide') {
            c.classList.remove('move');
        }
    }

    createControls() {
        if (this.hasEvent === false) {
            this.hasEvent = true;

            let b = document.body;

            b.addEventListener('keydown', (e) => {
                if (e.keyCode === 38 && this.activeKeyY === null && this.onLand === true) {
                    this.activeKeyY = 38;
                    this.jumpSpeed = Math.floor(this.height * -0.6);
                } else if ((e.keyCode === 37 || e.keyCode === 39) && this.activeKeyX === null) {
                    this.activeKeyX = e.keyCode;
                    this.animateCharacter('show');
                }
            });

            b.addEventListener('keyup', (e) => {
                if (e.keyCode === 37 || e.keyCode === 39) {
                    this.activeKeyX = null;

                    this.animateCharacter('hide');
                } else if (e.keyCode === 38) {
                    this.activeKeyY = null;
                    this.jumpSpeed = 0;
                }
            });
        }
    }

    createMap() {
        let m = this.map;
        let v = this.viewbox;
        let s;
        if ("children" in v) {
            s = v.children;
        }
        let w = this.width;
        let h = this.height;

        for (let r of s) {
            let d = r.children;
            let i = +r.dataset.gameRow;

            for (let c of d) {
                let j = +c.dataset.gameCol;

                if (m[i][j] === '#') {
                    c.classList.add('lawn');
                } else if (m[i][j] === 'H') {
                    c.classList.add('ground');
                } else if (m[i][j] === 'O') {
                    c.classList.add('finish');
                } else if (m[i][j] === '*' || m[i][j] === 'L') {
                    c.classList.add('block');
                } else if (m[i][j] === ' ') {
                    c.classList.add('space');
                } else if (m[i][j] === 'S') {
                    this.position = {x: j * w, y: i * h};
                } else if (!isNaN(Number(m[i][j])) && m[i][j]) {
                    c.classList.add('lvl-' + m[i][j]);
                }
            }
        }
    }

    initializeCharacter() {
        let i = this.position.y;
        let j = this.position.x;
        let c = this.character;
        let u = this.charWidth;

        c.classList.remove('hide');

        this.renderCharacter();
    }

    render() {
        let m = this;
        let a = m.activeKeyX;
        let x = m.position.x;
        let y = m.position.y;

        setTimeout(() => {
            window.requestAnimationFrame(m.render.bind(m));
        }, 1000 / m.fps);

        if (a !== null) {
            let u = m.charWidth;
            let c = m.character;

            if (this.won === false) {
                if (a === 37) {
                    m.moveCharacter(Math.floor(u * -0.15), 'l');
                } else if (a === 39) {
                    m.moveCharacter(Math.floor(u * 0.15), 'r');
                }
            }
        }

        m.gravity();

        m.viewbox.style.top = (y > (m.height * 9)) ? ((m.height * -5) + 'px') : '0';

        m.renderCharacter();
    }

    initialize() {
        this.won = false;
        this.dead = false;

        this.viewbox.classList.add('active');

        if (this.hasEvent === false) {
            this.render();
        }

        this.createControls();
        this.createMap();
        this.initializeCharacter();
    }
}

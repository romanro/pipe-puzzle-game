import L_Sprite from './Sprites/pipeL.png';
import L_Sprite_90 from './Sprites/pipeL-90.png';
import L_Sprite_180 from './Sprites/pipeL-180.png';
import L_Sprite_270 from './Sprites/pipeL-270.png';
import SHORT_Sprite from './Sprites/pipe-.png';
import SHORT_Sprite_90 from './Sprites/pipe--90.png';
import SHORT_Sprite_180 from './Sprites/pipe--180.png';
import SHORT_Sprite_270 from './Sprites/pipe--270.png';
import X_Sprite from './Sprites/pipeX.png';
import T_Sprite from './Sprites/pipeT.png';
import T_Sprite_90 from './Sprites/pipeT-90.png';
import T_Sprite_180 from './Sprites/pipeT-180.png';
import T_Sprite_270 from './Sprites/pipeT-270.png';
import I_Sprite from './Sprites/pipeI.png';
import I_Sprite_90 from './Sprites/pipeI-90.png';

export const convertMapDataToBoard = (map: string): string[] => {
    const ret = map.split('\n');
    ret.shift();
    ret.pop();
    return ret;
};

export const getSpriteSizeByLevel = (level: number): number => {
    //1 - 8, 2 - 20, 3 - 50, 4-100, 5-300, 6-1000;
    return LEVEL_TO_SPRITE_SIZE[level] || 100;
};

export const mapCharToSprite = (char: string): string => {
    return CHAR_TO_SPRITE_HASH_TABLE[char] || '';
};

export const rotateChar = (char: string): string => {
    return CHAR_ROTATE_MAP[char] || char;
};

const CHAR_TO_SPRITE_HASH_TABLE: { [key: string]: string } = {
    '╋': X_Sprite,

    '┛': L_Sprite,
    '┗': L_Sprite_90,
    '┏': L_Sprite_180,
    '┓': L_Sprite_270,

    '┻': T_Sprite,
    '┣': T_Sprite_90,
    '┳': T_Sprite_180,
    '┫': T_Sprite_270,

    '╸': SHORT_Sprite,
    '╹': SHORT_Sprite_90,
    '╺': SHORT_Sprite_180,
    '╻': SHORT_Sprite_270,

    '━': I_Sprite,
    '┃': I_Sprite_90,
};

const LEVEL_TO_SPRITE_SIZE: { [key: number]: number } = {
    1: 60,
    2: 35,
    3: 40,
    4: 40,
    5: 40,
    6: 35,
};

const CHAR_ROTATE_MAP: { [key: string]: string } = {
    '┛': '┗',
    '┗': '┏',
    '┏': '┓',
    '┓': '┛',

    '┻': '┣',
    '┣': '┳',
    '┳': '┫',
    '┫': '┻',

    '╸': '╹',
    '╹': '╺',
    '╺': '╻',
    '╻': '╸',

    '━': '┃',
    '┃': '━',
};

import L_Sprite from './Sprites/pipeL.png';
import SHORT_Sprite from './Sprites/pipe-.png';
import X_Sprite from './Sprites/pipeX.png';
import T_Sprite from './Sprites/pipeT.png';
import I_Sprite from './Sprites/pipeI.png';

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

export const mapCharToImage = (char: string): { img: string; css: string } => {
    return CHAR_TO_PNG_HASH_TABLE[char] || { img: '', css: '' };
};

export const rotateChar = (char: string): string => {
    return CHAR_ROTATE_MAP[char] || char;
};

const CHAR_TO_PNG_HASH_TABLE: { [key: string]: { img: string; css: string } } = {
    '╋': { img: X_Sprite, css: '' },

    '┛': { img: L_Sprite, css: '' },
    '┗': { img: L_Sprite, css: 'rotate90' },
    '┏': { img: L_Sprite, css: 'rotate180' },
    '┓': { img: L_Sprite, css: 'rotate270' },

    '┻': { img: T_Sprite, css: '' },
    '┣': { img: T_Sprite, css: 'rotate90' },
    '┳': { img: T_Sprite, css: 'rotate180' },
    '┫': { img: T_Sprite, css: 'rotate270' },

    '╸': { img: SHORT_Sprite, css: '' },
    '╹': { img: SHORT_Sprite, css: 'rotate90' },
    '╺': { img: SHORT_Sprite, css: 'rotate180' },
    '╻': { img: SHORT_Sprite, css: 'rotate270' },

    '━': { img: I_Sprite, css: '' },
    '┃': { img: I_Sprite, css: 'rotate90' },
};

const LEVEL_TO_SPRITE_SIZE: { [key: number]: number } = {
    1: 80,
    2: 35,
    3: 15,
    4: 6,
    5: 3,
    6: 2,
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

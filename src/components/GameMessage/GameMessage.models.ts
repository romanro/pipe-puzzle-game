import { GameStates } from 'models';

export interface IGameMessageProps {
    status: GameStates;
    level: string;
}

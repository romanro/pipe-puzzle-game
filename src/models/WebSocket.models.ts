export enum WebSocketMessagesEnum {
    NEW_GAME = 'new',
    CURRENT_MAP = 'map',
    HELP = 'help',
    VERIFY = 'verify',
    ROTATE = 'rotate',
}
export enum WebSocketResponsesEnum {
    NEW_GAME_STARTED = 'new: OK',
    PIPE_ROTATED = 'rotate: OK',
    INCORRECT = 'verify: Incorrect.',
    NO_MORE_VERIFICATIONS = 'verify: Only 10 verifications allowed per attempt.',
}

export function set (session) {
    return {
        type:'SET',
        payload: {session}
    }
}
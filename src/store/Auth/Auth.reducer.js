
export default function Auth(state=false, action){
    switch(action.type) {
        case 'SET':
            console.log(action.payload);
            if ( ! state ){
                return {token: '111', isLogin: false}
            }
            return state
        default:
            return state
    }
}
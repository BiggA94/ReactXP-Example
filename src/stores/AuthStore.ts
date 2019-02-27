import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';
import RX from 'reactxp';

@AutoSubscribeStore
class AuthStore extends StoreBase {
    private _loggedIn: boolean = false;

    @autoSubscribe
    public isLoggedIn() {
        return this._loggedIn;
    }

    public logIn(username?: string, password?: string) {
        if (username === 'test' && password === 'pass') {
            this._loggedIn = true;
            this.trigger();
        } else {
            RX.Alert.show('wrong credentials', 'The credentials, you\'ve provided, are not correct...');
        }
    }

    public logOut() {
        this._loggedIn = false;
        this.trigger();
    }
}

export default new AuthStore();

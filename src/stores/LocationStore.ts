import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';

@AutoSubscribeStore
class LocationStore extends StoreBase {
    private _locations: Position[] = [];

    @autoSubscribe
    public getLocations() {
        return this._locations;
    }

    public addLocation(location: Position) {
        if (location) {
            this._locations.push(location);
            this.trigger();
        }
    }

    public removeLastLocation() {
        this._locations.pop();
        this.trigger();
    }
}

export default new LocationStore();

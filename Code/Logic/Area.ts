export { Area }

import { AreaLayout } from "./AreaLayout";
import { Ship } from "./Ship";
import { Location } from "./Location";

class Area
{
    private _Layout:AreaLayout;
    private _Ships:Ship[];
    private _Locations:Location[];
    public constructor(Old?:Area)
    {
        this._Ships = [];
        this._Locations = [];
        if(Old!=null)
        {
            this._Layout = Old._Layout.Copy();
            for(let i in Old._Ships) this._Ships.push(Old._Ships[i].Copy());
            for(let i in Old._Locations) this._Locations.push(Old._Locations[i].Copy());
        }
        else
        {
            this._Layout = new AreaLayout();
        }
    }
    public Copy() : Area
    {
        return new Area(this);
    }
}
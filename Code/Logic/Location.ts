export { Location }

import * as Engineer from "engineer-js";

class Location
{
    private _Coordinates:Engineer.Vertex;
    public constructor(Old?:Location)
    {
        if(Old!=null)
        {
            this._Coordinates = Old._Coordinates.Copy();
        }
        else
        {
            this._Coordinates = new Engineer.Vertex(0,0,0);
        }
    }
    public Copy() : Location
    {
        return new Location(this);
    }
}
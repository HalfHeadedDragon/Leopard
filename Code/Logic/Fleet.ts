export { Fleet }

import * as Engineer from "engineer-js";

import { Ship } from "./Ship";

class Fleet
{
    private _Ships:Ship[];
    public constructor(Old?:Fleet)
    {
        this._Ships = [];
        if(Old!=null)
        {
            for(let i in Old._Ships) this._Ships.push(Old._Ships[i].Copy());
        }
        else
        {
        }
    }
}
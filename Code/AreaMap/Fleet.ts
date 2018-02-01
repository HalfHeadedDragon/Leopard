export { Fleet }

import * as Engineer from "engineer-js";

import { Ship } from "./Ship";

class Fleet
{
    private _MainShip:Ship;
    private _Ships:Ship[];
    public constructor(Old?:Fleet)
    {
        this._Ships = [];
        if(Old!=null)
        {
            this._MainShip = Old._MainShip.Copy();
            for(let i in Old._Ships) this._Ships.push(Old._Ships[i].Copy());
        }
        else
        {
            this._MainShip = new Ship();
        }
    }
    public Copy() : Fleet
    {
        return new Fleet(this);
    }
    public Activate(Scene:Engineer.Scene2D) : void
    {
        this._MainShip.Activate(Scene);
        for(let i in this._Ships) this._Ships[i].Activate(Scene);
    }
    public Load(Data) : void
    {
        if(!Data || !Data.MainShip || !Data.Ships)
        {
            Engineer.Log.Warning("Invalid Data for Fleet.");
            Engineer.Log.Warning(Data);
            return;
        }
        this._MainShip = new Ship();
        this._MainShip.Load(Data.MainShip);
        for(let i in Data.Ships)
        {
            let NewShip = new Ship();
            NewShip.Load(Data.Ships[i]);
            this._Ships.push(NewShip);
        }
    }
}
export { Area }

import * as Engineer from "engineer-js";

import { AreaLayout } from "./AreaLayout";
import { Ship } from "./Ship";
import { Location } from "./Location";

class Area
{
    private _Name:string;
    private _Layout:AreaLayout;
    private _Ships:Ship[];
    private _Locations:Location[];
    public constructor(Old?:Area, Name?:string)
    {
        this._Ships = [];
        this._Locations = [];
        if(Old!=null)
        {
            this._Name = Old._Name;
            this._Layout = Old._Layout.Copy();
            for(let i in Old._Ships) this._Ships.push(Old._Ships[i].Copy());
            for(let i in Old._Locations) this._Locations.push(Old._Locations[i].Copy());
        }
        else
        {
            if(Name) this._Name = Name;
            else this._Name = "Unknown Area";
            this._Layout = new AreaLayout();
        }
    }
    public Copy() : Area
    {
        return new Area(this);
    }
    public Activate(Scene:Engineer.Scene2D) : void
    {
        this._Layout.AddTo(Scene);
        for(let i in this._Ships)
        {
            this._Ships[i].Activate(Scene);
        }
    }
    public Deactivate(Scene:Engineer.Scene2D) : void
    {
        this._Layout.RemoveFrom(Scene);
        for(let i in this._Ships)
        {
            this._Ships[i].Deactivate(Scene);
        }
    }
    public Load(Data:any) : void
    {
        if(!Data || !Data.Layout || !Data.Ships || !Data.Locations)
        {
            Engineer.Log.Warning("Invalid Data for Area.");
            Engineer.Log.Warning(Data);
            return;
        }
        this._Layout.Load(Data.Layout);
        for(let i in Data.Ships)
        {
            let NewShip = new Ship();
            NewShip.Load(Data.Ships[i]);
            this._Ships.push(NewShip);
        }
    }
}
export { Area }

import * as Engineer from "engineer-js";

import { AreaLayout } from "./AreaLayout/AreaLayout";
import { Ship } from "./Ship";
import { LocationIcon } from "./Locations/LocationIcon";

class Area
{
    private _Name:string;
    private _Layout:AreaLayout;
    private _Ships:Ship[];
    private _LocationIcons:LocationIcon[];
    public constructor(Old?:Area, Name?:string)
    {
        this._Ships = [];
        this._LocationIcons = [];
        if(Old!=null)
        {
            this._Name = Old._Name;
            this._Layout = Old._Layout.Copy();
            for(let i in Old._Ships) this._Ships.push(Old._Ships[i].Copy());
            for(let i in Old._LocationIcons) this._LocationIcons.push(Old._LocationIcons[i].Copy());
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
        for(let i in this._LocationIcons)
        {
            this._LocationIcons[i].Activate(Scene);
        }
    }
    public Deactivate(Scene:Engineer.Scene2D) : void
    {
        this._Layout.RemoveFrom(Scene);
        for(let i in this._Ships)
        {
            this._Ships[i].Deactivate(Scene);
        }
        for(let i in this._LocationIcons)
        {
            this._LocationIcons[i].Deactivate(Scene);
        }
    }
    public Update(PlayerPosition:Engineer.Vertex) : void
    {
        for(let i in this._LocationIcons)
        {
            this._LocationIcons[i].Update(PlayerPosition);
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
        for(let i in Data.LocationIcons)
        {
            let NewLocationIcon = new LocationIcon();
            NewLocationIcon.Load(Data.LocationIcons[i]);
            this._LocationIcons.push(NewLocationIcon);
        }
    }
}
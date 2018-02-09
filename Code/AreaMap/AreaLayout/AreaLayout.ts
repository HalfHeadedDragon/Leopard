export { AreaLayout, AreaLayoutEntry }

import * as Engineer from "engineer-js";

import { AreaLayoutEntry } from "./AreaLayoutEntry";

class AreaLayout
{
    private _Entries:AreaLayoutEntry[];
    public constructor(Old?:AreaLayout)
    {
        this._Entries = [];
        if(Old)
        {
            for(let i in Old._Entries) this._Entries.push(Old._Entries[i].Copy());
        }
        else { }
    }
    public Copy() : AreaLayout
    {
        return new AreaLayout(this);
    }
    public AddTo(Scene:Engineer.Scene2D) : void
    {
        for(let i in this._Entries) this._Entries[i].AddToScene(Scene);
    }
    public RemoveFrom(Scene:Engineer.Scene2D) : void
    {
        for(let i in this._Entries) this._Entries[i].RemoveFromScene(Scene);
    }
    public Load(Data:any) : void
    {
        if(!Data || !Data.Entries)
        {
            Engineer.Log.Warning("Invalid Data for AreaLayout.");
            Engineer.Log.Warning(Data);
            return;
        }
        for(let i in Data.Entries)
        {
            let Entry = new AreaLayoutEntry();
            Entry.Load(Data.Entries[i]);
            this._Entries.push(Entry);
        }
    }
}
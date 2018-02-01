export { GameObject }

import * as Engineer from "engineer-js";

import { Area } from "./../AreaMap/Area";
import { Fleet } from "./../AreaMap/Fleet";

class GameObject
{
    private _ActiveArea:number;
    private _Fleet:Fleet;
    private _Areas:Area[];
    public constructor(Old?:GameObject)
    {
        this._Areas = [];
        if(Old != null)
        {
            this._ActiveArea = Old._ActiveArea;
            this._Fleet = Old._Fleet.Copy();
            for(let i in Old._Areas) this._Areas.push(Old._Areas[i].Copy());
        }
        else
        {
            this._ActiveArea = 0;
            this._Fleet = new Fleet();
        }
    }
    public Copy() : GameObject
    {
        return new GameObject(this);
    }
    public ActivateArea(Scene:Engineer.Scene2D) : void
    {
        this._Areas[this._ActiveArea].Activate(Scene);
        this._Fleet.Activate(Scene);
    }
    public Load(Data:any) : void
    {
        if(!Data || !Data.Areas || !Data.Fleet)
        {
            Engineer.Log.Warning("Invalid Data for GameObject.");
            Engineer.Log.Warning(Data);
            return;
        }
        this._ActiveArea = Data.ActiveArea;
        for(let i in Data.Areas)
        {
            let NewArea = new Area();
            NewArea.Load(Data.Areas[i]);
            this._Areas.push(NewArea);
        }
        this._Fleet.Load(Data.Fleet);
    }
}
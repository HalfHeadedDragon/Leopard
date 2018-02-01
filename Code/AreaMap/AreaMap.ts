export { AreaMap }

import * as Engineer from "engineer-js";

import { Area } from "./Area";

class AreaMap extends Engineer.Scene2D
{
    private _Area:Area;
    public constructor(Old?:AreaMap)
    {
        super(Old);
        if(Old)
        {
            if(Old._Area) this._Area = Old._Area.Copy();
        }
        else
        {
            this.Name = "AreaMap";
            this.BackColor = Engineer.Color.Aqua;
            this.LoadBackround();
        }
    }
    public SwitchArea(Area:Area) : void
    {
        if(this._Area) this._Area.Deactivate(this);
        this._Area = Area;
        this._Area.Activate(this);
    }
    private LoadBackround() : void
    {
        let Tile = Engineer.SceneObjectUtil.CreateTile("Back", null, new Engineer.Vertex(960,540,0), new Engineer.Vertex(1920,1080,1));
        Tile.Paint = Engineer.Color.FromString("#1E90FF");
        Tile.Fixed = true;
        this.AddSceneObject(Tile);
    }
}
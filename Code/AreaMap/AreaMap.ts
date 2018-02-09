export { AreaMap }

import * as Engineer from "engineer-js";

import { Area } from "./Area";
import { Fleet } from "./Fleet";

class AreaMap extends Engineer.Scene2D
{
    private _Area:Area;
    private _Fleet:Fleet;
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
        this.Events.MouseDown.push(this.MouseDown.bind(this));
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    public SwitchArea(Area:Area, Fleet:Fleet) : void
    {
        if(this._Area) this._Area.Deactivate(this);
        this._Area = Area;
        this._Area.Activate(this);
        this._Fleet = Fleet;
        this._Fleet.Activate(this);
    }
    private SceneUpdate() : void
    {
        if(this._Fleet.MainShip.OnMove)
        {
            this._Fleet.Update();
        }
    }
    private LoadBackround() : void
    {
        let Tile = Engineer.SceneObjectUtil.CreateTile("Back", ["Resources/Textures/Other/Water.png"], new Engineer.Vertex(960,540,0), new Engineer.Vertex(3840,2160,1));
        //Tile.Paint = Engineer.Color.FromString("#1E90FF");
        Tile.RepeatX = 80;
        Tile.RepeatY = 50;
        //Tile.Fixed = true;
        this.AddSceneObject(Tile);
    }
    private MouseDown(Game:Engineer.Game, Args:any) : void
    {
        Args.Location.X -= this.Trans.Translation.X;
        Args.Location.Y -= this.Trans.Translation.Y;
        this._Fleet.MainShip.Move(Args.Location);
    }
}
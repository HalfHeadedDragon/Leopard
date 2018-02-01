export { Ship }

import * as Engineer from "engineer-js";

class Ship
{
    private _Body:Engineer.Tile;
    private _Sails:Engineer.Tile;
    public get Position():Engineer.Vertex
    {
        return this._Body.Trans.Translation;
    }
    public set Position(Value:Engineer.Vertex)
    {
        this._Body.Trans.Translation = Value;
        this._Sails.Trans.Translation = Value;
    }
    public get Size():Engineer.Vertex
    {
        return this._Body.Trans.Scale;
    }
    public set Size(Value:Engineer.Vertex)
    {
        this._Body.Trans.Scale = Value;
        this._Sails.Trans.Scale = Value;
    }
    public constructor(Old?:Ship)
    {
        if(Old!=null)
        {
            this._Body = Old._Body.Copy();
            this._Sails = Old._Sails.Copy();
        }
        else
        {
            this.CreateTiles();
        }
    }
    public Copy() : Ship
    {
        return new Ship(this);
    }
    public Load(Data) : void
    {
        if(!Data || !Data.Position || !Data.Size)
        {
            Engineer.Log.Warning("Invalid Data for Ship.");
            Engineer.Log.Warning(Data);
            return;
        }
        this.Position = Data.Position;
        this.Size = Data.Size;
    }
    public Activate(Scene:Engineer.Scene2D) : void
    {
        Scene.AddSceneObject(this._Body);
        Scene.AddSceneObject(this._Sails);
    }
    private CreateTiles() : void
    {
        this._Body = Engineer.SceneObjectUtil.CreateTile("ShipBody");
        this._Sails = Engineer.SceneObjectUtil.CreateTile("ShipSails");
        this._Body.Collection = new ShipCollection(null, "Default", false);
        this._Sails.Collection = new ShipCollection(null, "Default", true);
        this._Sails.Paint = Engineer.Color.Black;
        this._Body.Index = 2;
        this._Sails.Index = 2;
    }
}

class ShipCollection extends Engineer.TileCollection
{
    public constructor(Old?:ShipCollection, Name?:string, Sails?:boolean)
    {
        super(Old);
        if(Old) {}
        else
        {
            if(Name)
            {
                this.LoadImages(Name, Sails);
            }
        }
    }
    private LoadImages(Name:string, Sails:boolean) : void
    {
        if(!Sails) for(let i = 0; i < 8; i++) this.Images.push("Resources/Textures/Ships/"+Name+"/Ship"+i+".png");
        else for(let i = 0; i < 8; i++) this.Images.push("Resources/Textures/Ships/"+Name+"/Sails"+i+".png");
    }
}
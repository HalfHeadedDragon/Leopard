export { LocationIcon }

import * as Engineer from "engineer-js";

class LocationIcon
{
    private _Type:number;
    private _Range:number;
    private _Border:Engineer.Tile;
    private _Icon:Engineer.Tile;
    public get Position():Engineer.Vertex { return this._Border.Trans.Translation; }
    public set Position(Value:Engineer.Vertex)
    {
        this._Border.Trans.Translation = Value;
        this._Icon.Trans.Translation = new Engineer.Vertex(Value.X, Value.Y, Value.Z + 0.5);
    }
    public get Size():Engineer.Vertex { return this._Border.Trans.Scale; }
    public set Size(Value:Engineer.Vertex)
    {
        this._Border.Trans.Scale = Value;
        this._Icon.Trans.Scale = Value.Copy().Scalar(0.5);
        this._Icon.Trans.Scale.Z = 1;
    }
    public constructor(Old?:LocationIcon)
    {
        if(Old!=null)
        {
            this._Border = Old._Border.Copy();
            this._Icon = Old._Icon.Copy();
        }
        else
        {
            this.CreateTiles();
        }
    }
    public Copy() : LocationIcon
    {
        return new LocationIcon(this);
    }
    private CreateTiles() : void
    {
        this._Border = Engineer.SceneObjectUtil.CreateTile("IconBorder");
        this._Icon = Engineer.SceneObjectUtil.CreateTile("Icon");
        this._Border.Collection = new LocationCollection(null, true);
        this._Icon.Collection = new LocationCollection(null, false);
    }
    public Activate(Scene:Engineer.Scene2D) : void
    {
        Scene.AddSceneObject(this._Border);
        Scene.AddSceneObject(this._Icon);
    }
    public Deactivate(Scene:Engineer.Scene2D) : void
    {
        Scene.RemoveSceneObject(this._Border);
        Scene.RemoveSceneObject(this._Icon);
    }
    public Load(Data) : void
    {
        if(!Data || !Data.Position || !Data.Location || !Data.Range)
        {
            Engineer.Log.Warning("Invalid Data for LocationIcon.");
            Engineer.Log.Warning(Data);
            return;
        }
        this.Position = Data.Position;
        
        this._Range = Data.Range;
        this._Type = Data.Type;
        if(this._Type == 1) this.Size = new Engineer.Vertex(60,60,1);
        else this.Size = new Engineer.Vertex(80,80,1);
        this._Border.Index = Data.Type * 2;
        this._Icon.Index = Data.ArtIndex;
    }
    public Update(PlayerPosition:Engineer.Vertex) : void
    {
        if(Engineer.Vertex.Distance(PlayerPosition, this.Position) < this._Range)
        {
            this._Border.Index = this._Type * 2 + 1;
            console.log("aaaa");
        }
        else this._Border.Index = this._Type * 2;
    }   
}

class LocationCollection extends Engineer.TileCollection
{
    public constructor(Old?:LocationCollection, Border?:boolean)
    {
        super(Old);
        if(Old) {}
        else
        {
            this.LoadImages(Border);
        }
    }
    private LoadImages(Border:boolean) : void
    {
        if(Border) for(let i = 0; i < 4; i++) this.Images.push("Resources/Textures/Locations/Border"+i+".png");
        else for(let i = 0; i < 5; i++) this.Images.push("Resources/Textures/Locations/Location"+i+".png");
    }
}
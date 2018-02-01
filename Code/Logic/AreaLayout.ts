export { AreaLayout, AreaLayoutEntry }

import * as Engineer from "engineer-js";

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
}
class AreaLayoutEntry
{
    private _ArtIndex:number;
    private _Position:Engineer.Vertex;
    private _Size:Engineer.Vertex;
    private _Generated:Engineer.Tile;
    public get ArtIndex():number { return this._ArtIndex; }
    public set ArtIndex(Value:number) { this._ArtIndex = Value; }
    public get Position():Engineer.Vertex { return this._Position; }
    public set Position(Value:Engineer.Vertex) { this._Position = Value; }
    public get Size():Engineer.Vertex { return this._Size; }
    public set Size(Value:Engineer.Vertex) { this._Size = Value; }
    public get Generated():Engineer.Tile { return this._Generated; }
    public constructor(Old?:AreaLayoutEntry)
    {
        if(Old)
        {
            this._ArtIndex = Old._ArtIndex;
            this._Position = Old._Position.Copy();
            this._Size = Old._Size.Copy();
        }
        else
        {
            this._ArtIndex = 0;
            this._Position = new Engineer.Vertex(0,0,0);
            this._Size = new Engineer.Vertex(100,100,1);
        }
    }
    public Copy() : AreaLayoutEntry
    {
        return new AreaLayoutEntry(this);
    }
    public AddToScene(Scene:Engineer.Scene2D) : void
    {
        this._Generated = Engineer.SceneObjectUtil.CreateTile("Island", null, this._Position.Copy(), this._Size.Copy());
        this._Generated.Collection = new AreaLayoutArtCollection();
        this._Generated.Index = 0;
        Scene.AddSceneObject(this._Generated);
    }
    public RemoveFromScene(Scene:Engineer.Scene2D) : void
    {
        if(this._Generated)
        {
            Scene.RemoveSceneObject(this._Generated);
            this._Generated = null;
        }
    }
}

class AreaLayoutArtCollection extends Engineer.TileCollection
{
    public constructor(Old?:AreaLayoutArtCollection)
    {
        super(Old);
        if(Old) { }
        else
        {
            this.InitCollection();
        }
    }
    private InitCollection() : void
    {
        this.Images.push("Resources/Textures/AreaLayout/Island0.png");
    }
}
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

class AreaLayoutEntry
{
    private _ArtIndex:number;
    private _Position:Engineer.Vertex;
    private _Size:Engineer.Vertex;
    private _Collision:Engineer.CollisionType;
    private _Generated:Engineer.Tile;
    private _Colliders:Engineer.Tile[];
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
            this._Colliders = [];
            for(let i in Old._Colliders) this._Colliders.push(Old._Colliders[i].Copy());
        }
        else
        {
            this._ArtIndex = 0;
            this._Position = new Engineer.Vertex(0,0,0);
            this._Size = new Engineer.Vertex(100,100,1);
            this._Colliders = [];
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
        this._Generated.Index = this._ArtIndex;
        this._Generated.Data["Island"] = true;
        if(this._Collision != null) this._Generated.Data["Collision"] = this._Collision;
        Scene.AddSceneObject(this._Generated);
        for(let i in this._Colliders) Scene.AddSceneObject(this._Colliders[i]);
    }
    public RemoveFromScene(Scene:Engineer.Scene2D) : void
    {
        if(this._Generated)
        {
            Scene.RemoveSceneObject(this._Generated);
            for(let i in this._Colliders) Scene.RemoveSceneObject(this._Colliders[i]);
            this._Generated = null;
        }
    }
    public Load(Data:any) : void
    {
        if(!Data || !Data.Position || !Data.Size)
        {
            Engineer.Log.Warning("Invalid Data for AreaLayoutEntry.");
            Engineer.Log.Warning(Data);
            return;
        }
        this._ArtIndex = Data.Art;
        this._Position = new Engineer.Vertex(Data.Position.X, Data.Position.Y, Data.Position.Z);
        this._Size = new Engineer.Vertex(Data.Size.X, Data.Size.Y, Data.Size.Z);
        if(Data.Colliders)
        {
            for(let i in Data.Colliders) this.LoadCollider(Data.Colliders[i]);
        }
    }
    private LoadCollider(Data:any) : void
    {
        if(!Data || !Data.Position || !Data.Size)
        {
            Engineer.Log.Warning("Invalid Data for AreaLayoutEntry Collider.");
            Engineer.Log.Warning(Data);
            return;
        }
        let Collider:Engineer.Tile = new Engineer.Tile;
        Collider.Trans.Translation = new Engineer.Vertex(Data.Position.X, Data.Position.Y, Data.Position.Z);
        Collider.Trans.Scale = new Engineer.Vertex(Data.Size.X, Data.Size.Y, Data.Size.Z);
        Collider.Data["IslandCollider"] = true;
        Collider.Active = false;
        if(Data.Collision == "Radius") Collider.Data["Collision"] = Engineer.CollisionType.Radius2D;
        if(Data.Collision == "Rectangular") Collider.Data["Collision"] = Engineer.CollisionType.Rectangular2D;
        this._Colliders.push(Collider);
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
        this.Images.push("Resources/Textures/Islands/Island0.png");
        this.Images.push("Resources/Textures/Islands/Island1.png");
    }
}
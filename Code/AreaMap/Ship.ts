export { Ship }

import * as Engineer from "engineer-js";

class Ship
{
    private _Name:string;
    private _OnMove:boolean;
    private _Speed:number;
    private _Destination:Engineer.Vertex;
    private _Body:Engineer.Tile;
    private _Sails:Engineer.Tile;
    private _Scene:Engineer.Scene2D;
    public get OnMove():boolean { return this._OnMove; }
    public get Position():Engineer.Vertex { return this._Body.Trans.Translation; }
    public set Position(Value:Engineer.Vertex)
    {
        this._Body.Trans.Translation = Value;
        this._Sails.Trans.Translation = Value;
    }
    public get Size():Engineer.Vertex { return this._Body.Trans.Scale; }
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
    public Move(Destination:Engineer.Vertex) : void
    {
        this._Destination = Destination.Substract(this.Position);
        this._OnMove = true;
        this.CalculateAngle();
    }
    public Update() : void
    {
        if(this._OnMove)
        {
            let Islands:Engineer.DrawObject[] = this._Scene.GetObjectsWithData("IslandCollider", true);
            Engineer.CollisionUtil.CalculateObjectCollisions("Island", this._Body, Islands);
            let MoveValue:Engineer.Vertex = this._Destination.Copy();
            if(this._Body.Data["Collision_Island"].Collision)
            {
                if(this._Body.Data["Collision_Island"].Left && MoveValue.X < 0) MoveValue.X = 0;
                if(this._Body.Data["Collision_Island"].Right && MoveValue.X > 0) MoveValue.X = 0;
                if(this._Body.Data["Collision_Island"].Top && MoveValue.Y < 0) MoveValue.Y = 0;
                if(this._Body.Data["Collision_Island"].Bottom && MoveValue.Y > 0) MoveValue.Y = 0;
            }
            let Position:Engineer.Vertex = this.Position;
            if(MoveValue.Length() < this._Speed)
            {
                Position = new Engineer.Vertex(Position.X + MoveValue.X, Position.Y + MoveValue.Y, Position.Z + MoveValue.Z);
                this.Position = Position;
                this._Destination = null;
                this._OnMove = false;
            }
            else
            {
                MoveValue.Normalize();
                MoveValue.Scalar(this._Speed);
                Position = new Engineer.Vertex(Position.X + MoveValue.X, Position.Y + MoveValue.Y, Position.Z + MoveValue.Z);
                this.Position = Position;
                this._Destination.Substract(MoveValue);
            }
        }
    }
    public Load(Data) : void
    {
        if(!Data || !Data.Position || !Data.Size || !Data.Name)
        {
            Engineer.Log.Warning("Invalid Data for Ship.");
            Engineer.Log.Warning(Data);
            return;
        }
        this._Name = Data.Name;
        this._Speed = Data.Speed;
        this.Position = Data.Position;
        this.Size = Data.Size;
        if(Data.BodyColor) this._Body.Paint = Engineer.Color.FromString(Data.BodyColor);
        if(Data.SailsColor) this._Sails.Paint = Engineer.Color.FromString(Data.SailsColor);
        if(Data.Rotation)
        {
            this._Body.Index = Data.Rotation;
            this._Sails.Index = Data.Rotation;
        }
    }
    public Activate(Scene:Engineer.Scene2D) : void
    {
        this._Scene = Scene;
        Scene.AddSceneObject(this._Body);
        Scene.AddSceneObject(this._Sails);
    }
    public Deactivate(Scene:Engineer.Scene2D) : void
    {
        this._Scene = null;
        Scene.RemoveSceneObject(this._Body);
        Scene.RemoveSceneObject(this._Sails);
    }
    private CreateTiles() : void
    {
        this._Body = Engineer.SceneObjectUtil.CreateTile("ShipBody");
        this._Sails = Engineer.SceneObjectUtil.CreateTile("ShipSails");
        this._Body.Collection = new ShipCollection(null, "Default", false);
        this._Sails.Collection = new ShipCollection(null, "Default", true);
        this._Sails.Paint = Engineer.Color.Black;
        this._Body.Data["Collision"] = Engineer.CollisionType.Radius2D;
        this._Sails.Data["Collision"] = Engineer.CollisionType.Radius2D;
    }
    private CalculateAngle() : void
    {
        let Angle:number = Engineer.Vertex.Angle(new Engineer.Vertex(0,1,0), this._Destination);
        Angle += 90;
        if(Angle > 360) Angle -= 360;
        if(Angle < 22.5)
        {
            this._Body.Index = 0;
            this._Sails.Index = 0;
        }
        else if (Angle < 67.5)
        {
            this._Body.Index = 1;
            this._Sails.Index = 1;
        }
        else if (Angle < 112.5)
        {
            this._Body.Index = 2;
            this._Sails.Index = 2;
        }
        else if (Angle < 157.5)
        {
            this._Body.Index = 3;
            this._Sails.Index = 3;
        }
        else if (Angle < 202.5)
        {
            this._Body.Index = 4;
            this._Sails.Index = 4;
        }
        else if (Angle < 247.5)
        {
            this._Body.Index = 5;
            this._Sails.Index = 5;
        }
        else if (Angle < 292.5)
        {
            this._Body.Index = 6;
            this._Sails.Index = 6;
        }
        else if (Angle < 337.5)
        {
            this._Body.Index = 7;
            this._Sails.Index = 7;
        }
        else
        {
            this._Body.Index = 0;
            this._Sails.Index = 0;
        }
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
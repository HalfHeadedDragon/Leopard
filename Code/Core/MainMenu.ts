export { MainMenu };

import * as Engineer from "engineer-js";

class MainMenu extends Engineer.Scene2D
{
    private _OnPlay:Function;
    private _Game:Engineer.Game;
    public constructor(Game:Engineer.Game, OnPlay:Function)
    {
        super();
        this._Game = Game;
        this._OnPlay = OnPlay;
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        let Buttons:any = new Engineer.TileCollection(null, ["/Resources/Textures/Play.png"]);
        let Play:any = Engineer.SceneObjectUtil.CreateTile("Play", ["/Resources/Textures/Play.png"], new Engineer.Vertex(200, 200, 0), new Engineer.Vertex(300, 150, 1));
        Play.Events.MouseDown.push(this._OnPlay);
        this.AddSceneObject(Play);
        this._Game.AddScene(this);
    }
}
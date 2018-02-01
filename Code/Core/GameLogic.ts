export { GameLogic };

import * as Engineer from "engineer-js";

import { GameObject } from "./GameObject";
import { GameFile } from "./GameFile";
import { MainMenu } from "./MainMenu";
import { GameScene } from "./../GameScene";
import { AreaMap } from "./../AreaMap/AreaMap";

class GameLogic
{
    private _Game:Engineer.Game;
    private _Runner:Engineer.Runner;
    private _GameObject:GameObject;
    public constructor()
    {
        this._GameObject = new GameObject();
        this._GameObject.Load(GameFile);
        this._Game = new Engineer.Game();
        this._Game.Name = "Leopard";
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new Engineer.Vertex(1920, 1080, 0));
        let _Menu:any = new MainMenu(this._Game, this.PlayClick.bind(this));
        this._Game.AddScene(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu", false);
        this._Runner.Run();
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new AreaMap();
        this._Game.AddScene(Scene);
        this._GameObject.ActivateArea(Scene);
        this._Runner.SwitchScene("AreaMap", false);
    }
}
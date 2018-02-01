export { Ship }

import * as Engineer from "engineer-js";

class Ship
{
    private _Visual:Engineer.Sprite;
    public constructor(Old?:Ship)
    {
        if(Old!=null)
        {
            this._Visual = Old._Visual.Copy();
        }
        else
        {
            this.CreateSprite();
        }
    }
    public Copy() : Ship
    {
        return new Ship(this);
    }
    private CreateSprite() : void
    {
        this._Visual = new Engineer.Sprite();
        this._Visual .Name = "ShipVisual";
    }
}
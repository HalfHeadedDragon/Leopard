export { Game }

import { Area } from "./Area";

class Game
{
    private _Areas:Area[];
    public constructor(Old?:Game)
    {
        this._Areas = [];
        if(Old != null)
        {
            for(let i in Old._Areas) this._Areas.push(Old._Areas[i].Copy());
        }
        else
        {

        }
    }
    public Copy() : Game
    {
        return new Game(this);
    }
}
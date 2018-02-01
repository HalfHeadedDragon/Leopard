export { GameFile }

let GameFile = 
{
    ActiveArea:0,
    Areas:
    [
        {
            Name: "Sunken Spire",
            Layout:
            {
                Entries:
                [
                    {
                        Art: 0,
                        Position: { X:600, Y:600, Z:0 },
                        Size: { X:300, Y:300, Z:0 }
                    }
                ]
            },
            Ships:[],
            Locations:[]
        },
    ],
    Fleet:
    {
        MainShip:
        {
            Position: { X:960, Y:540, Z:0 },
            Size: { X:100, Y:100, Z:0 }
        },
        Ships:[]
    }
};
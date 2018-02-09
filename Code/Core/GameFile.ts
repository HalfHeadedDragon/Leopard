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
                        Position: { X:1300, Y:400, Z:0 },
                        Size: { X:600, Y:600, Z:0 },
                        Colliders:
                        [
                            {
                                Position: { X:1200, Y:300, Z:0 },
                                Size: { X:300, Y:300, Z:0 },
                                Collision: "Radius"
                            },
                            {
                                Position: { X:1125, Y:475, Z:0 },
                                Size: { X:150, Y:200, Z:0 },
                                Collision: "Radius"
                            },
                            {
                                Position: { X:1250, Y:600, Z:0 },
                                Size: { X:50, Y:50, Z:0 },
                                Collision: "Radius"
                            },
                            {
                                Position: { X:1500, Y:425, Z:0 },
                                Size: { X:120, Y:120, Z:0 },
                                Collision: "Radius"
                            }
                            ,
                            {
                                Position: { X:1400, Y:325, Z:0 },
                                Size: { X:120, Y:120, Z:0 },
                                Collision: "Radius"
                            }
                        ]
                    },
                    {
                        Art: 1,
                        Position: { X:400, Y:900, Z:0 },
                        Size: { X:300, Y:300, Z:0 },
                        Colliders:
                        [
                            {
                                Position: { X:400, Y:900, Z:0 },
                                Size: { X:300, Y:300, Z:0 },
                                Collision: "Radius"
                            }
                        ]
                    }
                ]
            },
            Ships:
            [
                {
                    Name: "Mastodon",
                    Position: { X:1360, Y:500, Z:0 },
                    Size: { X:200, Y:200, Z:0 },
                    BodyColor: "#B1C8FF",
                    SailsColor: "#DDDDDD",
                    Rotation: 3,
                    Speed: 2
                }
            ],
            Locations:[]
        },
    ],
    Fleet:
    {
        MainShip:
        {
            Name: "Raft",
            Position: { X:960, Y:540, Z:0 },
            Size: { X:120, Y:120, Z:0 },
            BodyColor: "#FFFFFF",
            SailsColor: "#222222",
            Speed: 1
        },
        Ships:[]
    }
};
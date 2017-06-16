// Returns a Dog Race
function races() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var races = [
        { 
            name: "Poodle",
            attributes: {
                force: 2,
                intelligence: 3,
                agility: 4
            }
        },
        { 
            name: "Vira latas",
            attributes: {
                force: 3,
                intelligence: 3,
                agility: 3
            }
        },
        { 
            name: "Rottweiler",
            attributes: {
                force: 5,
                intelligence: 2,
                agility: 2
            }
        }
    ];

    return races[rnd(3)];
}
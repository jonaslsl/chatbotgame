// Returns a Dog Race
function sillyname() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var races = [
        { 
            name: "Poodle",
            attibutes: {
                force: 2,
                intelligence: 5,
                agility: 4
            }
        },
        { 
            name: "Vira latas",
            attibutes: {
                force: 3,
                intelligence: 3,
                agility: 3
            }
        },
        { 
            name: "Rottweiler",
            attibutes: {
                force: 5,
                intelligence: 2,
                agility: 2
            }
        }
    ];

    return races[rnd(3)];
}
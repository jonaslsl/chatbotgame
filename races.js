// Returns a Dog Race
function races() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var races = [
        { 
            name: "Poodle",
            force: 2,
            intelligence: 2,
            agility: 4
        }
    ];

    return races[0];
}
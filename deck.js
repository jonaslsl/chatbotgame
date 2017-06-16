// Returns an event
function deck() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var deck = [
        { 
            event: "Hoje é dia de dar um rolê na ISS",
            options: [
                {
                    message: "Comer um lanchinho em forma de pasta",
                    fn: "(function(dog){ if(dog.intelligence <= 3){  dog.life -= 3;  dog.stress += 2;  return 'Se ferrou '; } })"
                },
                {
                    message: "Girar a ISS até conseguir simular a gravidade",
                    fn: "(function(dog){ if(dog.intelligence <= 3){  dog.life -= 3;  dog.stress += 2;  return 'Se ferrou '; } })"
                }
            ]
        }
    ];

    return deck[0];
}
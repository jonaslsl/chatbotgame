// Returns an event
function deck() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var deck = [
        { 
            event: "Hoje é dia de dar um rolê na ISS",
            options: {
                one: "Comer um lanchinho em forma de pasta",
                two: "Girar a ISS até conseguir simular a gravidade",
            },
            consequence: {
                one: {
                    message: "O lanchinho te fez mal, você gorfou e perdeu 1 ponto se sua inteligência for menor que 3",
                    type: "lose",
                    attributes: { life: { is_true: true, points: 1 }, stress: { is_true: false, points: 0} },
                    condition: {
                        attribute: "intelligence",
                        points: 3
                    },
                    phase: "Se danou, você não é tão inteligente haha!",
                },
                two: {
                    message: "Você ficou tonto, acabou gorfando, depois de tanta fome comeu seu vomito e passou mal denovo. Perca 3 pontos de vida ganhe 2 de stress se sua inteligência for menor que 3",
                    type: "lose",
                    attributes: { life: { is_true: true, points: 3 }, stress: { is_true: true, points: 2} },
                    condition: {
                        attribute: "intelligence",
                        points: 3
                    },
                    phase: "Se danou, você não é tão inteligente haha!",
                }
            }
        }
    ];

    return deck[0];
}
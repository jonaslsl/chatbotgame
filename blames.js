// Returns a Dog Race
function blames() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    var blame_list = [
        "Não existe essa opção espertalhão, vai denovo!",
        "RESPOSTA ERRADA, tenta ler as opções na próxima",
        "Por um acaso eu te dei essa opção??? Tenta denovo gênio!",
    ];

    return blame_list[rnd(3)];
}
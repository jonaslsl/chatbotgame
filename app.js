// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var basicChat = angular.module( 'BasicChat', ['appFilters'] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
basicChat.controller( 'BasicController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // Sent Indicator
    $scope.status = "";

    // Keep an Array of Messages
    $scope.messages = [];

    $scope.me = {name: "Player"};

    // Set User Data
    //Messages.user($scope.me);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Get Received Messages and Add it to Messages Array.
    // This will automatically update the view.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var chatmessages = document.querySelector(".chat-messages");

    var show = function(msg) {
        console.log(msg)

        npc = { user: { name: npc_name }, data: msg }

        $scope.messages.push(npc);
    
        setTimeout(function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10);

    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.send = function() {

        var user = { user: { name: "Player" }, data: $scope.textbox};
        $scope.messages.push(user);

        $rootScope.$broadcast('input-sent', { option: $scope.textbox });

        $scope.status = "sending";
        $scope.textbox = "";

        setTimeout(function() { 
            $scope.status = "" 
        }, 1200 );
    
    };

    $scope.$on('input-sent', function(event, args) {
        var o = args.option;
        console.log(o);

        if(o == "1" || o == "2" ){
            $scope.option = o;
            $scope.next();
        }else{
            var blame = blames();
            show(blame);
        }

    });

    $scope.$on('next-step', function(event, args) {
        var f = args.callback;
        console.log(f);
        $scope.next = f;
    });

    //  $scope.$on('consequence', function(event, args) {
    //     var card = args.card;

    //     if($scope.option == "1"){
    //         show(card.consequence.one.message)
    //     }else{
    //         show(card.consequence.two.message)
    //     }

    //     // if( dog[deck.contition.attribute] <= deck.contition.points){
    //     //     console.log("Lose");
    //     // }else{
    //     //     console.log("Win");
    //     // }
        
    // });

    $scope.$watch('option', function() {
        console.log($scope.option);
    });


    
    //setup
    $scope.option = 0;
    $scope.next = null;
    var card = null;
    var life  = 10;
    var stress = 5;
    
    //Game intro
    var dog = races();
    var npc_name = sillyname();
    var npc = {
        data: "Olá, meu nome é " + npc_name,
        user: {
            id: 1,
            name: npc_name
        }
    };

    show("Olá, meu nome é " + npc_name);
    show("O ano é 2113 e os humanos precisam encontrar um novo planeta e deixar a terra. Vários países iniciam programas de busca de planetas habitáveis. Aproveitando-se os recentes avanços de transgênia neural e sua aplicação em cachorros das forças armadas, a Rússia decide reativar o programa Korabl-Sputnik, lançando os animais como cobaias para planetas. ")
    show("Você é um cachorro da raça " + dog.name + ". Pronto pra aventura?");
    show("(1 - Sim, 2 - Não)");


    // one: {
    //     message: "O lanchinho te fez mal, você gorfou e perdeu 1 ponto se sua inteligência for menor que 3",
    //     type: "lose",
    //     attributes: { life: { is_true: true, points: 2 }, stress: { is_true: false, points: 0} },
    //     contition: {
    //         attribute: "intelligence",
    //         points: 3
    //     },
    //     phase: "Se danou, você não é tão inteligente haha!",
    // },
    var consequences = function(){
         
        option = $scope.option == "1" ? "one" : "two"
        show(card.consequence[option].message)
        //condition attibute
        if (dog.attributes[card.consequence[option].condition.attribute] <= card.consequence[option].condition.points){
            //Lose type
            if(card.consequence[option].type == "lose"){
                life -= card.consequence[option].attributes.life.is_true ? card.consequence[option].attributes.life.points : 0;
                stress += card.consequence[option].attributes.stress.is_true ? card.consequence[option].attributes.stress.points : 0;
                show(card.consequence[option].phase);
            }
        }
        show("Sua vida é de " + life)
        show("Seu stress é de " + stress)
        events();
    }

    var events = function(){
        card = deck();
        show(card.event);
        show("Suas opções são:");
        show("1 - " + card.options.one );
        show("2 - " + card.options.two );

        show("E agora?")
        $rootScope.$broadcast('next-step', { callback: consequences });
    }

    var startGame = function(){
        if($scope.option == "1"){
            show("Seus atributos são: ");
            show("Força - " + dog.attributes.force);
            show("Agilidade - " + dog.attributes.agility);
            show("Inteligência - " + dog.attributes.intelligence);
            show("Bora? (1 - Sim, 2 - Não)");
            $rootScope.$broadcast('next-step', { callback: events });
        }else{
            show({ user: { name: npc_name }, data: "Valeu! Falou!" });    
        }
    }
    
    $rootScope.$broadcast('next-step', { callback: startGame });
    

} ] );

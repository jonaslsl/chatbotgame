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

    //Show bot Messages
    var show = function(msg) {
        console.log(msg)

        npc = { user: { name: npc_name }, data: msg }

        $scope.messages.push(npc);
    
        setTimeout(function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10);

    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send User Messages
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

    //Read Input
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


    //Set next step
    $scope.$on('next-step', function(event, args) {
        var f = args.callback;
        console.log(f);
        $scope.next = f;
    });

   
    // $scope.$watch('option', function() {
    //     console.log($scope.option);
    // });
    
    //Setup
    $scope.option = 0;
    $scope.next = null;
    var card = null;
    var dog = races();
    dog.life = 10;
    dog.stress = 5;

    //Game Core
    var events = function(){
        card = deck();
        show(card.event);
        show("Suas opções são:");
        show("1 - " + card.options[0].message );
        show("2 - " + card.options[1].message );

        show("E agora?")
        $rootScope.$broadcast('next-step', { callback: consequences });
    }

    var consequences = function(){
         
        option = $scope.option == "1" ? "0" : "1" //array position
        var f = eval(card.options[option].fn);
        r = f(dog);

        if(r.end){
            show(r.message);
            show("Você chegou a seu destino");
            show("(1 - Fazer xixi no chão de Marte, 2 - Rolar de felicidade e pedir carinho pros seus humanos?");
            $rootScope.$broadcast('next-step', { callback: finish });
        }else{
            show(r.message)
            if(dog.life <= 0){
                show("Você morreu!");
            }
            if(dog.stress >= 10 ){
                show("Você morreu!");   
            }
            show("Sua vida: " + dog.life );
            show("Seu stress " + dog.stress );
            events(); //load new event
        }

        
    }

    var finish = function(){
        if($scope.option == "1"){
            show("Parabéns, você ganhou o jogo conquistando Marte");
        }else{
            show("Você perdeu o jogo, sua raça está novamente submetida a raça humana");
        }
    }
    
    //Game intro
    var npc_name = "Bot"
    show("Olá, meu nome é " + npc_name);
    show("O ano é 2113 e os humanos precisam encontrar um novo planeta e deixar a terra. Vários países iniciam programas de busca de planetas habitáveis. Aproveitando-se os recentes avanços de transgênia neural e sua aplicação em cachorros das forças armadas, a Rússia decide reativar o programa Korabl-Sputnik, lançando os animais como cobaias para planetas. ")
    show("Você é um cachorro da raça " + dog.name + ". Pronto pra aventura?");
    show("(1 - Sim, 2 - Não)");

    //Game start
    var startGame = function(){
        if($scope.option == "1"){
            show("Você tem 10 pontos de vida e 5 pontos de stress. Seu objetivo é chegar ao fim do jogo e não morrer. Se sua sua vida chegar a zero você morre ou se seu stress chegar a 10 você morre também");
            show("Seus atributos são: ");
            show("Força - " + dog.force);
            show("Agilidade - " + dog.agility);
            show("Inteligência - " + dog.intelligence);
            show("Bora? (1 - Sim, 2 - Não)");
            $rootScope.$broadcast('next-step', { callback: events });
        }else{
            show({ user: { name: npc_name }, data: "Valeu! Falou!" });    
        }
    }
    
    $rootScope.$broadcast('next-step', { callback: startGame });
    

} ] );

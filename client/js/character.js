const auto = $(document).ready(()=>{

    const content = document.getElementsByClassName('content');
    const error = document.getElementsByClassName('error');


    $(function(){
    
        var post_url = '/findCharacter';												
        
        $.ajax({
            type: 'GET',
            url: post_url, 
            beforeSend: function(){                
            },
            success: function(data) {                    			
                const charList = data.charList;
                if(charList.length == 0){
                    $(content).html('<button onclick="createCharacterModal()">Criar novo personagem</button>');
                } else {

                    charList.forEach(char =>{

                        const func = 'entrarLobby("' + char.name +'")';

                        $(content).append('<div> '+
                        'Name:'+ char.name +' <br>'+
                        'Level:'+ char.level +' <br>'+
                        'Classe:'+ char.classe +'<br>'+
                        '<button onclick='+ func +'>Entrar</button>'+
                        '</div>');
                    })

                }													
            }, 
            error: function(data){
                $(error).html("<h3>"+ data.responseJSON.msg + "</h3>");
            }																						
        });
    })




})

function createCharacterModal(){

    const createCharModal = document.getElementById('createCharModal');
    $(createCharModal).css("display", "grid");
  
}

function createCharacter(){

    const name = document.getElementById('name').value;
    const classe = document.getElementById('classe').value;

    const content = document.getElementsByClassName('content');
    const error = document.getElementsByClassName('error');

    $(function(){
    
        var post_url = '/create';												
        
        $.ajax({
            type: 'POST',
            url: post_url,
            data: {name, classe}, 
            beforeSend: function(){                
            },
            success: function(data) {        
                
                $(content).html('');
                $(createCharModal).css("display", "none");

                
                // Atualiza lista de personagens após criação!
                $(function(){
    
                    var post_url = '/findCharacter';												
                    
                    $.ajax({
                        type: 'GET',
                        url: post_url, 
                        beforeSend: function(){                
                        },
                        success: function(data) {                    			
                            const charList = data.charList;
                            if(charList.length == 0){
                                $(content).html('<button onclick="createCharacterModal()">Criar novo personagem</button>');
                            } else {
            
                                charList.forEach(char =>{
                                    $(content).append('<div> '+
                                    'Name:'+ char.name +' <br>'+
                                    'Level:'+ char.level +' <br>'+
                                    'Classe:'+ char.classe +'<br>'+
                                    '<button onclick="'+ entrarLobby(char.name) +'>Entrar</button>'+
                                    '</div>');
                                })
            
                            }													
                        }, 
                        error: function(data){
                            $(error).html("<h3>"+ data.responseJSON.msg + "</h3>");
                        }																						
                    });
                })

            }, 
            error: function(data){
                $(error).html("<h3>"+ data.responseJSON.msg + "</h3>");
            }																						
        });
    })


}


function entrarLobby(name){

   localStorage.setItem('charName', name);
   window.location.href = '/lobby';

}
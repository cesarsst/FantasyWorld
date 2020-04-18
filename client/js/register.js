function register(){

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const content = document.getElementById('content');
    const error = document.getElementsByClassName('error');

    $(function(){
    
        var post_url = '/register';												
        var post_data = {name, email, password};
        
        $.ajax({
            type: 'POST',
            url: post_url, 
            data: post_data,
            beforeSend: function(){                
            },
            success: function(data) {                    			
                $(content).html('');
                $(content).html('<h3>'+ data.msg +'</h3><br> <a href="/login">Logar!</a>');			    													
            }, 
            error: function(data){
                $(error).html("<h3>"+ data.responseJSON.msg + "</h3>");
            }																						
        });
    })



}
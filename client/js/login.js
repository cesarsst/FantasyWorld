function entrar(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const content = document.getElementById('content');
    const error = document.getElementsByClassName('error');

    $(function(){
    
        var post_url = '/login';												
        var post_data = {email, password};
        
        $.ajax({
            type: 'POST',
            url: post_url, 
            data: post_data,
            beforeSend: function(){                
            },
            success: function(data) {                    			
                window.location.href = '/character';		    													
            }, 
            error: function(data){
                $(error).html("<h3>"+ data.responseJSON.msg + "</h3>");
            }																						
        });
    })



}
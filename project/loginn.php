<!DOCTYPE html>
<html>
  <head>
    <title>

    </title>
  </head>
  <link rel = "stylesheet"type="text/css"href="priyal.css">
  <link rel ="stylesheet" href ="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<body>
  
  <div class="parent clearfix">
   
    <div class="bg-illustration">
      <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="home.html">Home</a>
        <a href="signin.html">Sign In</a>
        <a href="login.html">Login</a>
        <a href="#">Lets play</a>
        <a href="#">FAQ's/a>
      </div>
      <div id="main">
        <button class="openbtn" onclick="openNav()">☰ Lets navigate! </button>  
      </div>
    </div>

    <div class="login">
      
      <div class="container">
        <h1 style="text-align: center;">Login!!!</h1>
        <div class="login-form">
          <form action="" method="post" >
           
            <input type="text" placeholder="Username"class="form-control" required >
            <input type="password" placeholder="Password"class ="form-control"required>
            
            <button type="submit" >Login </button>
            
          </form>
          
        </div>
        
    
      </div>
      </div>
  </div>
  <script>
    function openNav() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
    
    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    }
  </script>
 

</script>


</body>

</html>
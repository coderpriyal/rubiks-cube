<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div class="parent clearfix">
<div class="bg-illustration">
<div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="home.html">Home</a>
        <a href="http://localhost/project/register.php">Sign In</a>
        <a href="http://localhost/project/login.php">Login</a>
        <a href="letsplay1.html">Lets play</a>
        <a href="faqs1.html">FAQ's</a>
      </div>
      <div id="main">
        <button class="openbtn" onclick="openNav()">☰ Lets Navigate!! </button>  
      </div>
	  </div>
	 
	  <div class="login">
      
      <div class="container">
        <h1>Login!!!</h1>
        <div class="login-form">
		<form method="post" action="">
  	<?php include('errors.php'); ?>
	  
  	<div class="input-group">
  		<label>Username</label>
  		<input type="text" name="username" >
  	</div>
  	<div class="input-group">
  		<label>Password</label>
  		<input type="password" name="password">
  	</div>
  	<div class="input-group">
  		<button type="submit" class="btn" name="login_user">Login</button>
  	</div>
  	<p>
  		Not yet a member? <a href="register.php">Sign up</a>
  	</p>
            
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
</body>
</html>
<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  <title>Registration system PHP and MySQL</title>
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
        <button class="openbtn" onclick="openNav()">☰ Lets navigate! </button>  
      </div>
    </div>

     <div class ="login">
		<div class ="container">
		<h1>Lets Sign in!!!</h1>
		<div class ="login-form">
  <form method="post" action="register.php">
  	<?php include('errors.php'); ?>
	
	  
  	<div class="input-group">
  	  <label>Username</label>
  	  <input type="text" name="username" value="<?php echo $username; ?>">
	  <br>
		
  	</div>
	  <div class="input-group">
  	  <label>Age</label>
  	  <input type="number" name="age" value="<?php echo $age; ?>">
	  <br>
	
  	</div>
  	<div class="input-group">
  	  <label>Email</label>
  	  <input type="email" name="email" value="<?php echo $email; ?>">
	
  	</div>
  	<div class="input-group">
  	  <label>Password</label>
  	  <input type="password" name="password_1">
	
  	</div>
  	<div class="input-group">
  	  <label>Confirm password</label>
  	  <input type="password" name="password_2">
  	</div>
  	<div class="input-group">
  	  <button type="submit" class="btn" name="reg_user">Register</button>
  	</div>
  	<p>
  		Already a member? <a href="login.php"> Login</a>
  	</p>
  </form>
  </div>
  </div>
  </div>
</div>
  <script src="login.js">
        </script>
</body>
</html>
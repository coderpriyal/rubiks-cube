<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: home.html");
  }
?>
<html>
<head></head>
	<link rel="stylesheet" type="text/css" href="Rubik.css">
	<script type="text/javascript" src="Rubik.js"></script>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  
	<title>PSYCUBE-Lets Play</title>
</head>
<body style="background-color: powderblue;">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand" href="/">PSYCUBE</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
		  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
	
		<div class="collapse navbar-collapse" id="navbarSupportedContent" style="background-color: rgb(13, 154, 172);">
		  <ul class="navbar-nav mr-auto">
			<li class="nav-item">
			  <a class="nav-link" href="home2.php" style="color: black;">Home <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item active">
	
				<a class="nav-link" href="letsplay2.php" style="color: black;">Lets Play</a>
			</li>
			<li class="nav-item">
	
			  <a class="nav-link" href="faqs2.php" style="color: black;">FAQs</a>
			</li>
	
			<li class="nav-item">
	
                <a class="nav-link" href="myprofile.html" style="color: black;">My Profile</a>
            </li>
			<li class="nav-item">
                <?php  if (isset($_SESSION['username'])) : ?>
    	
        <a href="home.html?logout='1'" style="color: black;">Logout</a> 
   <?php endif ?>
</li>

	
		  </ul>
		</div>
	  </nav>
	<div class="div1">
		<div class="div1Content">
			<div id="leftImage">
				<img class="Centered" src="Orientation.png" title="Orientation" alt="Orientation">
			</div>
			<p><span style="font-weight: 700; font-family: Arial; font-size: 16px; margin-left:200px;">String Input</span></p>

			<div id="help-tip">
    			<p onclick="help()">?</p>
			</div>

			<textarea id="textarea" spellcheck="false" cols="54" rows="2" style="font-weight: 700; font-family: Arial; font-size: 14px; margin-left:28px; margin-top: 10px;"></textarea>
			<button id="enter" onclick="stringInput()">Enter</button>

			<h1 style="margin-left: 30px; margin-top: 25px; font-size:25px; font-family: Arial;">Reverse Solution</h1>

			<label class="switch">
			  <input type="checkbox" id="checkbox">
			  <span class="slider" onclick="Rev()"></span>
			</label>

			<div id="help-tip2">
    			<p onclick="help2()">?</p>
			</div>
		</div>
	</div>

	<div class="div2">
		<div id="grid">

			<div id="selCol">
				<p><span style="font-weight: 700; font-family: Arial; font-size: 16px; margin-left:20px;">Selected Color</span></p>
				<button class="button" id="selectedColor"></button>
			</div>

			<div id="pickColor">
				<p><span style="font-weight: 700; font-family: Arial; font-size: 16px; margin-left:27px;">Pick Color</span></p>
				<div id="pickGrid">
					<button class="pickButton" id="R" onclick="pickColor(this.id)">R</button>
					<button class="pickButton" id="W" onclick="pickColor(this.id)">W</button>
					<button class="pickButton" id="Y" onclick="pickColor(this.id)">Y</button>
					<button class="pickButton" id="G" onclick="pickColor(this.id)">G</button>
					<button class="pickButton" id="B" onclick="pickColor(this.id)">B</button>
					<button class="pickButton" id="O" onclick="pickColor(this.id)">O</button>
				</div>
				<button id="submit" onclick="submit()">Submit</button>
				<button id="clearAll" onclick="clearAll()">Clear All</button>
			</div>

			<div id="others">
				<button id="Scramble" onclick="Scramble()">Scramble</button>
				<button id="SolvedState" onclick="SolvedState()">Solved State</button>
			</div>

			<div class="red">
				<button class="button" id="R7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R9" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R5"></button>
				<button class="button" id="R6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="R3" onclick="buttonClick(this.id)"></button>
			</div>

			<div class="blue">
				<button class="button" id="B7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B5"></button>
				<button class="button" id="B2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B9" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="B3" onclick="buttonClick(this.id)"></button>
			</div>

			<div class="white">
				<button class="button" id="W1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W3" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W5"></button>
				<button class="button" id="W6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="W9" onclick="buttonClick(this.id)"></button>
			</div>

			<div class="green">
				<button class="button" id="G1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G5"></button>
				<button class="button" id="G8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G3" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="G9" onclick="buttonClick(this.id)"></button>
			</div>

			<div class="orange">
				<button class="button" id="O1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O3" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O5"></button>
				<button class="button" id="O6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="O9" onclick="buttonClick(this.id)"></button>
			</div>

			<div class="yellow">
				<button class="button" id="Y1" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y2" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y3" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y4" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y5"></button>
				<button class="button" id="Y6" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y7" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y8" onclick="buttonClick(this.id)"></button>
				<button class="button" id="Y9" onclick="buttonClick(this.id)"></button>
			</div>
		</div>
	</div>

	<div class="div3">
		<div id="textBox" class="Centered">
			<p id="text"></p>
		</div>
		<div id="rightImage">
			<img width="500px" class="Centered"src="Moves.png" title="Moves" alt="Moves" usemap="#clicker" unselectable="on">
			<map name="clicker">
			    <area shape="rect" coords="0,0,67,115"    title="R" id="MR" onclick="Mclick(this.id)">
				<area shape="rect" coords="77,0,144,115"  title="r" id="Mr" onclick="Mclick(this.id)">
			    <area shape="rect" coords="174,0,245,115" title="L" id="ML" onclick="Mclick(this.id)">
			    <area shape="rect" coords="253,0,322,115" title="l" id="Ml" onclick="Mclick(this.id)">
			    <area shape="rect" coords="350,0,421,115" title="B" id="MB" onclick="Mclick(this.id)">
			    <area shape="rect" coords="431,0,498,115" title="b" id="Mb" onclick="Mclick(this.id)">

			    <area shape="rect" coords="0,132,67,260"    title="D" id="MD" onclick="Mclick(this.id)">
			    <area shape="rect" coords="77,132,144,260"  title="d" id="Md" onclick="Mclick(this.id)">
			    <area shape="rect" coords="174,132,245,260" title="F" id="MF" onclick="Mclick(this.id)">
			    <area shape="rect" coords="253,132,322,260" title="f" id="Mf" onclick="Mclick(this.id)">
			    <area shape="rect" coords="350,132,421,260" title="U" id="MU" onclick="Mclick(this.id)">
			    <area shape="rect" coords="431,132,498,260" title="u" id="Mu" onclick="Mclick(this.id)">
			</map>
		</div>	
	</div>

</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel = "stylesheet"type="text/css"href="mystyle.css">
</head>
<body>
    <div class="nav">
        <nav>
        <ul class ="nav transition">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="sign_in.html">Sign in</a></li>
            <li><a href="play.html">Lets Play</a></li>
            <li><a href="FAQs.html">FAQ'S</a></li>
        </ul>
    </nav>
    </div>

    <div class="gif">
        <img class="simpsons" src="the-simpsons-homer.gif">
    </div>

    <div class="info">
        <h1>GO RUBIX!</h1>
        <h1><b>What is Rubik's Cube?</b></h1>
        <p>The Rubik’s Cube was invented in 1974 by Ernõ Rubik, a Hungarian architecture professor.<br>
            Rubik later used the Cube as a learning exercise to teach his students about 3-dimensional spaces. </p>
        <p>Little did he know his “Magic Cube” (as he originally named it) would become one of world’s most famous puzzles of all time!</p>
    </div>

    <div class="solve">
        <h4><b>How to Solve the magic cube?</b></h4>
        <p>There are various algorithms by which a rubik's cube can be solved.The most important three are:<br>
        <br>
            <b>Fridrich method</b>
            <p>The main method that people advance to off of beginner methods is CFOP.<br> 
               In fact, some beginner methods use some, if not all, of CFOP’s steps in a slightly easier to understand way.</p>
            <p>
                The steps involve building the foundations for the first two layers and then pairing up pieces before inserting them around the foundations to solve the first two layers.<br>
                 Then the last layer is tackled by learning the algorithms to solve the cube in two extra steps.<br>
                  All steps of this method become incredibly simple once algorithms have been drilled and the solver has practiced enough, which probably contributes to its unbelievable speed capacities.<br>
            </p>
            <p>
            <b>Roux Method</b>
        </p>
        <p>Roux method is based on Blockbuilding and Corners method<br>
            The method uses four steps.The first two steps involve building 1x2x3 blocks,followed by solving the corners.<br>
            The final step is to implement the Lst Six Edges(LSE) strategy.<br>       
        </p>
            
            </p>

            <p><b>ZZ Method</b></p>
        <p>The ZZ method (short for "Zbigniew Zborowski") is a modern speedcubing method originally proposed by Zbigniew Zborowski in 2006.<br>
            It involves orienting all edges while placing two oppositely placed down-face edges aligned with the correspondingly colored center. <br>
            The next step solves the remaining first two layers using only left, right, top and bottom face turns, one of the advantages of ZZ.<br>

        </p>
        </p>
    </div>
<div class="button1">
    <button type="button" onclick="login()">LOGIN</button>
</div>
</body>
<script>
    function login(){
        window.open("login_new.html")
    }
</script>
</html>


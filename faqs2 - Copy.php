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

<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>PSYCUBE-FAQs</title>
</head>

<body style="background-color:powderblue">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">PSYCUBE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="background-color:rgb(13, 154, 172)"> 
            <!-- 139, 78, 175 -->
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="home2.php" style="color: black;">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">

                    <a class="nav-link" href="letsplay2.php" style="color: black;">Lets Play</a>
                </li>
                <li class="nav-item">

                    <a class="nav-link active" href="faqs2.php" style="color: black;">FAQs</a>
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

    <div class="container mt-3">
        <hr>
            <h2 style="color: black;"><b> Some Interesting Facts about Rubik's </b></h2>
            <hr>
            <div class="row justify-content-center">
            <div class="card mx-4" style="width: 18rem; background-color: rgb(13, 154, 172);">
                <p class="card-img-top" alt="...">
                <div class="card-body"  style="background-color: rgb(0, 0, 0);">
                    <h5 class="card-title" style="color: rgb(255, 255, 255);"><b>The "Magic" Cube</b></h5>
                    <p class="card-text" style="color: rgb(255, 255, 255);">Back when the Rubik's Cube was first introduced in the market in 1974, it was termed as the 'Magic Cube' or 'Bűvös Kocka' in Hungarian. In order to overcome the international patent challenges that had arisen in Hungary, the Ideal Toy Corporation, which had bought the rights to this puzzle, changed the name to 'Rubik's Cube' in 1980.</p>
                    <a href="https://rubiks.com/en-US/" class="btn btn-primary" style="background-color: rgba(0, 0, 0, 0.700);">Click Me</a>
                </div>
            </div>
            <div class="card mx-4" style="width: 18rem; background-color: rgb(13, 154, 172);">
                <p class="card-img-top" alt="...">
                <div class="card-body" style="background-color: rgb(0, 0, 0);">
                    <h5 class="card-title" style="color: rgb(255, 255, 255);"><b>The first-ever guide was created by a 13-year-old.</b></h5>
                    <p class="card-text" style="color: rgb(255, 255, 255);">In the initial days of Rubik's Cube release, a 13-year-old boy, Patrick Bossert, had published a book called 'You Can Do the Cube' in 1981. This guide sold over 1.5 million copies. In fact, it had become a universal seller and is it still available for purchase!</p>
                    <a href="https://kewbz.co.uk/blogs/tips-tricks/cool-3x3-rubiks-cube-patterns" class="btn btn-primary" style="background-color: rgba(0, 0, 0, 0.700);">Click Me</a>
                </div>
            </div>
            <div class="card mx-4" style="width: 18rem; background-color: rgb(13, 154, 172);">
                <p class="card-img-top" alt="...">
                <div class="card-body" style="background-color: rgb(0, 0, 0);">
                    <h5 class="card-title" style="color: rgb(255, 255, 255);"><b>Robots can solve it in under one second.</b></h5>
                    <p class="card-text" style="color: rgb(255, 255, 255);">A Robot named Sub1 solved the Rubik's Cube in 0.887 seconds! It used two webcams to capture the arrangement of the sides. It then calculated the solution as the Arduino-compatible microcontroller board applied the 20 Steps. The MultiCuber999 robot received a Guinness World Record for solving 9x9x9 cubes.</p>
                    <a href="https://www.google.com/doodles/rubiks-cube" class="btn btn-primary" style="background-color: rgba(0, 0, 0, 0.700);">Click Me</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container my-3">
        <hr>
        <h2 style="color: black;"> <b>Frequently Asked Questions</b></h2>
        <hr>
        <div class="accordion" id="accordionExample">
            <div class="card" style="background-color: rgb(13, 154, 172);">
                <div class="card-header" id="headingOne" style="background-color: rgb(13, 154, 172);">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne" style="color: rgb(255, 255, 255);">
                            Is there Mathematics in a Rubik's Cube ?
                        </button>
                    </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                    data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        Mathematically the Rubik's Cube is a permutation group. It has 6 different colors and each color is repeated exactly 9 times, so the cube can be considered as an ordered list which has 54 elements with numbers between 1 and 6, each number meaning a color being repeated 9 times.We can rotate the 6 faces of the cube so we can define 6 basic operations or permutations which rearrange the ordered list in a certain way. Repeating and combining these permutations we can define new permutations, which rearrange the list in an other way
                    </div>
                </div>
            </div>
            <div class="card" style="background-color: rgb(0, 0, 0);">
                <div class="card-header" id="headingTwo" style="background-color: rgb(0, 0, 0);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style="color: rgb(255, 255, 255);">
                            Is the Rubik's Cube good for you ?
                        </button>
                    </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        The Rubik's cube has a lot of direct and indirect benefits. Some of them are that it will help you improve your cognitive and problem-solving abilities as well as your memory. It will also teach you many life lessons like patience, perseverance and focus in the process. These benefits are what you will notice when you solve the cube not just once but many times, every single day.
                    </div>
                </div>
            </div>
            <div class="card" style="background-color: rgb(13, 154, 172);">
                <div class="card-header" id="headingThree" style="background-color: rgb(13, 154, 172);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style="color: rgb(255, 255, 255);">
                            How does the Rubik's Cube work ?
                        </button>
                    </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        The Rubik's Cube is a 3-D combination puzzle invented in 1974 by Hungarian sculptor and professor of architecture Ernő Rubik. According to the inventor himself, “There are axises, to turn the axises you turn the faces, it contains 27 different pieces. What you can see is only 26, because there is one in the middle”.
                    </div>
                </div>


            </div>

            <div class="card" style="background-color: rgb(0, 0, 0);">
                <div class="card-header" id="headingFour" style="background-color: rgb(0, 0, 0);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" style="color: rgb(255, 255, 255);">
                            Why is the Rubik's Cube so popular and what age is it good for ?
                        </button>
                    </h2>
                </div>
                <div id="collapseFour" class="collapse" aria-labelledby="headingFourcollapseFour"
                    data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        The reason the Rubik's cube became so popular was because of its incredibly simplistic design, combined with its extreme difficulty. With over 43,252,003,274,489,856,000 different possible positions on the puzzle, it added to the challenge of solving it.It has therefore become a puzzle that is both admirable as well as irritable when people think about it.The Rubik’s Cube is not age restricted. Any person who is between 5 to 99 can solve the cube and benefit from it.
                    </div>
                </div>


            </div>

            <div class="card" style="background-color: rgb(13, 154, 172);">
                <div class="card-header" id="headingFive" style="background-color: rgb(13, 154, 172);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" style="color: rgb(255, 255, 255);">
                            Does solving a Rubik's Cube increase your IQ ?
                        </button>
                    </h2>
                </div>
                <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        No.There is no concrete evidence to support the claim that solving a Rubik’s Cube increase the Intelligence Quotient of a person. Although a correlation can be seen with people who know how to solve the cube and people with high IQ, there is no proof that solving it will increase IQ.
                    </div>
                </div>


            </div>

            <div class="card" style="background-color: rgb(0, 0, 0);">
                <div class="card-header" id="headingSix" style="background-color: rgb(0, 0, 0);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" style="color: rgb(255, 255, 255);">
                            What is the benefit of solving the Rubik's Cube ?
                        </button>
                    </h2>
                </div>
                <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        There are many advantages to solving the Rubik's cube that will indirectly help your brain become sharper. For one, it betters your eye-hand coordination. It improves your concentration in general and ensures that you can process your thoughts faster. It makes you more patient and a better problem solver. It also improves your finger dexterity and agility.
                    </div>
                </div>


            </div>
            <div class="card" style="background-color: rgb(13, 154, 172);">
                <div class="card-header" id="headingSeven" style="background-color: rgb(13, 154, 172);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven" style="color: rgb(255, 255, 255);">
                            What Percentage of population can solve the Rubik's Cube ?
                        </button>
                    </h2>
                </div>
                <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        It's estimated that less than 5.8% of the world's population can solve the Rubik's Cube.
                    </div>
                </div>


            </div>
            <div class="card" style="background-color: rgb(0, 0, 0);"> 
                <div class="card-header" id="headingEightcollapseEight" style="background-color: rgb(0, 0, 0);">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" style="color: rgb(255, 255, 255);">
                            How many algorithms are there to solve a Rubik's Cube ?
                        </button>
                    </h2>
                </div>
                <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
                    <div class="card-body" style="color: rgb(255, 255, 255);">
                        The number of algorithms vary based on the methods used but one method exists which has a total of 537 different algorithms to remember. Although it is only used by speed cubers, they use a combination of different methods so they do not have to remember all the different algorithms. However, there are a small group of people who have learnt all of them.
                    </div>
                </div>


            </div>
        </div>
    </div>

   
    <footer class="container">
        <hr>
            <p class="float-right"><a href="#" style="color: black;">Back to top</a></p>
            <p> <b>PSYCUBE</b>  · <a href="#" style="color: black;">Home</a> · <a href="#" style="color: black;">My Profile</a></p>
        <hr>
          </footer>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>
</html>
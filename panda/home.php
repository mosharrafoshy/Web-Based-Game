<html>
  <head>
    <title>CSE-480</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <style>
		body{
			background-attachment:fixed;
			background-repeat: no-repeat;
			background-position: 0 0;
		}
	</style>

    <script language="JavaScript1.2">
		var bgimages=new Array()
		bgimages[0]="images/img1.jpg"
		bgimages[1]="images/img2.jpg"
		bgimages[2]="images/img3.jpg"

		//preload images
		var pathToImg=new Array()
		for (i=0;i<bgimages.length;i++){
		pathToImg[i]=new Image()
		pathToImg[i].src=bgimages[i]
		}

		var inc=-1

		function bgSlide(){
		if (inc<bgimages.length-1)
		inc++
		else
		inc=0
		document.body.background=pathToImg[inc].src
		}

		if (document.all||document.getElementById)
		window.onload=new Function('setInterval("bgSlide()",4000)')

	</script>

  </head>
  <body>
  	<div class="container-fluid" style="min-height: 550px;">
  		<div class="row">
  			<div class="col-sm-10">
	  			

	  		</div>
	  		<div class="col-sm-2">
	  			<div id="user">
					 <div class="dropdown">
					  	 <button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown"><b id="username" style="color: lightblue; font-size: 17px;"></b><span class="glyphicon glyphicon-user"></span>
						  <span class="caret"></span></button>
						  <ul class="dropdown-menu">
						    <li><a href="logout.php">Log-Out</a></li>
						  </ul>
					</div>
  				</div>
	  		</div>
  		</div>
	  	<div class="row" style="opacity: .90">
	  		<div class="col-sm-3">
	  			

	  		</div>
	  		<div class="col-sm-6">
	  			<div class="logo" style="min-height: 100px;">
	  				<h1 style="color: lightblue; text-align: center;font-weight: bold; font-style: italic; font-size: 60px;">Surviving <br/>Panda<br/><br/></h1>
	  			</div>
	  			<div class="new-game" style="padding-top: 25px;">
	  				<form action="new_game.php" method="post">
	  					 <button type="sumit" class="btn btn-info btn-block btn-lg">New Game</button>
	  				</form>
	  			</div>
					<div class="panel-group" style="padding-top: 5px;">
					  <div class="panel panel-info">
					    <div class="panel-heading">
					      <h3 class="panel-title" style="text-align: center;">
					        <a data-toggle="collapse" href="#collapse1" style="text-decoration: none;">Search</a>
					      </h3>
					    </div>
					    <div id="collapse1" class="panel-collapse collapse">
					      <div class="panel-body">
					      	<form action="search.php" method="post">
					      		  <div class="form-group">
									  <label for="sel1">Select list:</label>
									  <select class="form-control" name="option">
									    <option value="1" style="text-align: center;">Search Your Top 5 Result </option>
									    <option value="2" style="text-align: center;">Serach All-Time Top 5 Result</option>
									  </select>
									</div>
								<button type="sumit" class="btn btn-info btn-block">Submit</button>
							</form>
					      </div>
					    </div>
					  </div>
					</div>
					<h3 id="score" style="padding-top:10px; padding-bottom:10px;  color:white; text-align:center; background-color:lightblue;"></h3>
	  		</div>
	  		<div class="col-sm-3">
	  		</div>

	  		

	  	</div>

  	</div>
  	<footer>
   
  			 <p style="font-size:15px; text-align: center; color:#0d1a00; background-color: #4CAF50; border: 2px solid #0d1a00">&copy; <b>Copyright 2016 Mohip-Oshy; Course-CSE480</b><br/>Better View In Mozilla Firefox</p> 
        
		</footer>
  </body>
</html>

<?php
if(isset($_GET["score"]))
{
	$x=$_GET['score'];
	echo "<script>document.getElementById('score').innerHTML = '* Your Score = ".$x." *';</script>";
}
else
{
	echo "<script>document.getElementById('score').innerHTML = '* Welcome *';</script>";
}
if(!isset($_COOKIE['game']))
{
	header("Location: index.php");
}
else
{
	$v=$_COOKIE["game"];
	setcookie("game",$v,time()+1800);
	echo "<script>document.getElementById('username').innerHTML = '* Hello! ".$v." * ';</script>";
}
?>
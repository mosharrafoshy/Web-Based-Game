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
		table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
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
					  	 <button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown"><b id="username" style="color: lightblue;  font-size: 17px;"></b><span class="glyphicon glyphicon-user"></span>
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
	  			<div class="logo" style="min-height: 150px;s">
	  				<h1 style="color: lightblue; text-align: center;font-weight: bold; font-style: italic; font-size: 30px;">Surviving <br/>Panda<br/><br/></h1>
	  			</div>
	  			<div class="home" style="padding-top: 15px; padding-bottom: 15px;">
	  				<form action="home.php" method="post">
	  					 <button type="sumit" class="btn btn-info btn-block btn-lg">Back to Home</button>
	  				</form>
	  			</div>
	  			<div id="tab" style="background-color: white;">
				</div>
				
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
$host="127.0.0.1";
$user="root";
$pass="";
$conn=mysql_connect($host, $user, $pass);
mysql_select_db("test",$conn);
$a=$_POST["option"];
if(!isset($_COOKIE['game']))
{
	header("Location: index.php");
}
else
{
	$v=$_COOKIE["game"];
	setcookie("game",$v,time()+1800);
	echo "<script>document.getElementById('username').innerHTML = '* Hello! ".$v." * ';</script>";
	if($a==1)
	{
		$v=$_COOKIE["game"];
		$q="select * from result where user='".$v."' order by total desc;";
		$r=mysql_query($q,$conn);
		$b="<table><tr><th>User</th><th>Score</th></tr>";
		for($i=0; $i<5 && $i<mysql_num_rows($r); $i++)
		{
			$row=mysql_fetch_row($r);
			$b=$b."<tr><td>".$row[0]."</td><td>".$row[1]."</td></tr>";
		}
		$b=$b ."</table>";
		echo "<script>document.getElementById('tab').innerHTML = '".$b."';</script>";
	}
	else
	{
		$v=$_COOKIE["game"];
		$q="select * from result order by total desc;";
		$r=mysql_query($q,$conn);
		$b="<table><tr><th>User</th><th>Score</th></tr>";
		for($i=0; $i<5 && $i<mysql_num_rows($r); $i++)
		{
			$row=mysql_fetch_row($r);
			$b= $b."<tr><td>".$row[0]."</td><td>".$row[1]."</td></tr>";
		}
		$b=$b ."</table>";
		echo "<script>document.getElementById('tab').innerHTML = '".$b."';</script>";
	}
}
?> 

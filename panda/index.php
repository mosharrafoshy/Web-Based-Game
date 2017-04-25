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
  	<div class="container-fluid" style=" min-height: 550px;">

	  	<div class="row" style="opacity: .90">
	  		<div class="col-sm-3">
	  			

	  		</div>
	  		<div class="col-sm-6">
	  			<div class="logo" style="min-height: 100px;">
	  				<h1 style="color: lightblue; text-align: center;font-weight: bold; font-style: italic; font-size: 60px;">Surviving <br/>Panda<br/><br/></h1>
	  			</div>
				<div class="panel-group" id="accordion" style="padding-top: 20px;">
					<div class="panel panel-success">
					  <div class="panel-heading">
					    <h5 class="panel-title" style="text-align: center;">
					      <a data-toggle="collapse" data-parent="#accordion" href="#collapse1"  style="text-decoration: none;">Log In</a>
					    </h5>
					  </div>
					  <div id="collapse1" class="panel-collapse collapse in">
					  	<div id="logtext" style="text-align: center; padding-bottom: 2px;">
					  	</div>
					    <form class="form-horizontal" role="form" action="login.php" method="post" style="padding-top: 5px;">
						    <div class="form-group">
								<label class="control-label col-sm-2">User Name:</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" name="name" placeholder="Enter user name">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="pwd">Password:</label>
								<div class="col-sm-10">          
									<input type="password" class="form-control" name="pass" placeholder="Enter password">
								</div>
							</div>
							<div class="form-group">        
								<div class="col-sm-offset-2 col-sm-10">
									<button type="submit" class="btn btn-default">Submit</button>
								</div>
							</div>
						  </form>
					  </div>
					</div>
					<div class="panel panel-success">
					  <div class="panel-heading">
					    <h5 class="panel-title" style="text-align: center;">
					      <a data-toggle="collapse" data-parent="#accordion" href="#collapse2" style="text-decoration: none;">Sign Up</a>
					    </h5>
					  </div>
					  <div id="collapse2" class="panel-collapse collapse">
					   <div id="signuptext" style="text-align: center; padding-bottom: 2px;">
					  	</div>
					    <form class="form-horizontal" role="form" action="signup.php" method="post" style="padding-top: 5px;">
						    <div class="form-group">
								<label class="control-label col-sm-2">User Name:</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" name="name" placeholder="Enter user name">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="pwd">Password:</label>
								<div class="col-sm-10">          
									<input type="password" class="form-control" name="pass" placeholder="Enter password">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="pwd">Confirm Password:</label>
								<div class="col-sm-10">          
									<input type="password" class="form-control" name="c_pass" placeholder="Enter password again..">
								</div>
							</div>
							<div class="form-group">        
								<div class="col-sm-offset-2 col-sm-10">
									<button type="submit" class="btn btn-default">Submit</button>
								</div>
							</div>
						  </form>
					  </div>
					</div>
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
if(!isset($_GET["status"]))
	$a='0';
else
	$a=$_GET["status"];
if(!isset($_COOKIE["game"]))
{
	if($a=='0' || $a=='1')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Welcome! Log In Your Account *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* Welcome! Create New Account *';</script>";
	}
	else if($a=='2')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Your giving information doesn't exists *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* Welcome! Create New Account *';</script>";
	}
	else if($a=='3')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Log Out! Please Come back again! *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* Welcome! Create New Account *';</script>";
	}
	else if($a=='4')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Welcome! Log In Your Account *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '*Confirm_Password didn't mathch!*';</script>";
	}
	else if($a=='5')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Welcome! Log In Your Account *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* User Name exits, Please change it!*';</script>";
	}
	else if($a=='6')
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Welcome! Log In Your Account *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* Please fill-up all text box*';</script>";
	}
	else
	{
		echo "<script>document.getElementById('logtext').innerHTML = '* Welcome! Log In Your Account *';</script>";
		echo "<script>document.getElementById('signuptext').innerHTML = '* Sign Up failed*';</script>";
	}
}
else
{
	$v=$_COOKIE["game"];
	setcookie("game",$v,time()-1);
	setcookie("game",$v,time()+1800);
	header("Location: home.php");
}


?>

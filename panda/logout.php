<?php
if(isset($_COOKIE["game"]))
{
	$v=$_COOKIE["game"];
	setcookie("game",$v,time()-1);
}
header("Location: index.php?status=3");
?> 

<?php
$a=$_GET["score"];
$b=intval($a);
if(isset($_COOKIE['new_game']))
{
	$u=$_COOKIE['new_game'];
	/*if($u==1)
	{*/
		$host="127.0.0.1";
		$user="root";
		$pass="";
		$conn=mysql_connect($host, $user, $pass);
		mysql_select_db("test",$conn);
		$v=$_COOKIE['game'];
		$q="insert into result values('".$v."',".$b.");";
		$r=mysql_query($q,$conn);	
		mysql_close($conn);
	//}
	setcookie("new_game",0,time()-1);

}
header("Location: home.php?score=".$a);
?>
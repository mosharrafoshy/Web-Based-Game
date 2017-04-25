<?php
$host="127.0.0.1";
$user="root";
$pass="";
$conn=mysql_connect($host, $user, $pass);
$u=$_POST['name'];
$p=$_POST['pass'];
mysql_select_db("test",$conn);
$seed=substr($u, 0,2);
$pass=crypt($p,$seed);
$q="select * from user where user='".$u."' and pass='".$pass."';";
$r=mysql_query($q,$conn);
$a=mysql_num_rows($r);
if($a==1)
{
	if(isset($_COOKIE["game"]))
	{
		$v=$_COOKIE["game"];
		setcookie("game",$v,time()-1);;
	}
	setcookie("game",$u,time()+1800);
	$v = $_COOKIE["game"];
	header("Location: home.php");
}
else
{
	header("Location: index.php?status=2");
}
mysql_close($conn);


?> 
 

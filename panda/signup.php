<?php
$host="127.0.0.1";
$user="root";
$pass="";
$conn=mysql_connect($host, $user, $pass);
$u=$_POST['name'];
$p=$_POST['pass'];
$cp=$_POST['c_pass'];
mysql_select_db("test",$conn);
if($p=="" || $p==null ||  $u=="" || $u==null)
{
	header("Location: index.php?status=6");
}
else if($p!=$cp)
{
	header("Location: index.php?status=4");
}
else
{
	$q="select * from user where user='".$u."';";
	$r=mysql_query($q,$conn);
	$a=mysql_num_rows($r);
	//echo $q." ".$a;
	if($a==1)
	{
		header("Location: index.php?status=5");
	}
	else
	{
		$seed=substr($u, 0,2);
		$pass=crypt($p,$seed);
		$query = "insert INTO user values ('" . $u . "','" . $pass . "');";
		//echo $query;
		$result = mysql_query($query,$conn);
		if($result==false)
			header("Location: index.php?status=7");
		else
		{
			setcookie("game",$u,time()+1800);
			header("Location: home.php");
		}
	}
}
mysql_close($conn);


?> 

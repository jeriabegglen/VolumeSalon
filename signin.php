<!doctype html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>VolumeSalon</title>
		<meta name="description" content="">
		<link rel="stylesheet" href="css/bootstrap.css" media="screen" />
		<link rel="stylesheet" href="css/styles.css" media="screen" />
		<link rel="stylesheet" href="css/font-awesome.min.css" media="screen" />
		<link rel="stylesheet" href="css/magnific-popup.css" media="screen" />
		<link rel="stylesheet" href="css/retina.css" media="screen" />
		<link rel="stylesheet" href="css/media.css" media="screen" />
		<link rel="stylesheet" href="css/animated.min.css" media="screen" />
		<link rel="shortcut icon" href="img/favicon.ico" type="image/png">
		<script type="text/javascript" src='js/modernizr.min.js'></script>
	</head>
	<body>
		<!--Welcome section-->
		<header class="alt"  data-animation="fadeIn fast" data-delay="0"> <!--alt class for no bg -->
			<div class="container">
				<div class="row">
					<!--Company name-->
					<div class="col-md-3 for-mobile-header-1"><!-- for-menu-header-1 class for fullwidth dropdown menu on devices -->
						<h2><a href="#pagetop">Volume Salon</a></h2>
					</div>
					<div class="col-md-9 for-mobile-header-2 for-one-page"><div class="mobile-wrapper clearfix">  <!-- for-menu-header-2 class for fullwidth dropdown menu on devices -->
							<!--Menu block-->
							<nav class="main-menu clearfix navbar navbar-default">
								<!--menu button on responsive -->
								<div class="navbar-header" data-toggle="collapse" data-target="#top-main-menu">
									<button type="button" class="navbar-toggle">
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
									</button>
									<a class="navbar-brand" href="#">navigation</a>
								</div>
							</nav>
							<div class="collapse navbar-collapse m-menu" id="top-main-menu">
								<ul class="sf-menu superfish-li-relative">
									<li class="current-menu-item">
										<a href="index.php">Home</a>
									</li>
								</ul>
							</div>
						</div></div>
				</div>
			</div>
		</header>
		<!--View Area-->
		<section data-hash="Signin" class="waypoint alt-bg-1 color-2">
			<div class="alt-bg-1 color-2">
				<div class="spacer" style="height:10px;"></div>
				<div class="container">
					<div class="col-sm-12">
						<div class="row">
							<div class="tAc">
								<br /><h2 class="big white" style="max-width:710px; display:inline-block;" data-animation="fadeInUp slow" data-delay="0">Admin Page</h2><br />
									<form role="form" method="post">
										<fieldset>
											<div class="form-group"  >
												<input class="form-control" placeholder="user" name="user" type="usrname" autofocus>
											</div>
											<div class="form-group">
												<input class="form-control" placeholder="Password" name="pass" type="password" value="">
											</div>
												<input class="btn btn-lg btn-success btn-block" type="submit" value="submit" name="submit" >
										</fieldset>
									</form>
							</div>
						</div>
					</div>
				</div>
				<div class="spacer" style="height:78px;"></div>
			</div>
		</section>
		<!--Footer section-->
				<section id="footer">
			<div class="copyright-block">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="tAc">
								Copyright &copy; 2015 Family. All Rights Reserved.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<script type="text/javascript" src='js/jquery.min.js'></script>
		<script type="text/javascript" src='js/script.js'></script>
	</body>
</html>


<?php
include("db/db_con.php");

if(isset($_POST['submit']))
{
  if(!empty($_POST['user']) && !empty($_POST['pass']))
  {

    $user=$_POST['user'];
    $pw=$_POST['pass'];

		$sql = "SELECT * FROM Admin WHERE User='$user'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_assoc($result);
    $hashed_pass = $row['Password'];
    $hash = password_verify($pw, $hashed_pass);
		mysqli_free_result($result);
		if($hash == 0)
    {
			echo "<script>alert('User or password is incorrect!')</script>";
		}
		else
		{
			$check_user="select * from Admin WHERE User='$user'AND Password='$hashed_pass'";
			$run=mysqli_query($con,$check_user);

			if(mysqli_num_rows($run))
			{
				session_start();
				header("location:profiles.php");
				$_SESSION['user']=$user;

			}
				else
		    {
          echo "<script>alert('User or password is incorrect!')</script>";
		    }
	    }
   }
	 mysqli_close($con);
}
?>
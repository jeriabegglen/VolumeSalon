<!doctype html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Aaron Herrera</title>
		<meta name="description" content="Aaron Herrera Art">
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
	<body >
		<header class="alt color-2"  data-animation="fadeIn fast" data-delay="0">
			<div class="container">
				<div class="row">
					<div class="col-md-3 for-mobile-header-1">
						<h1><a href="#pagetop">Aaron Herrera</a></h1>
					</div>
					<div class="col-md-9 for-mobile-header-2 for-one-page"><div class="mobile-wrapper clearfix">
							<nav class="main-menu clearfix navbar navbar-default">
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
								<ul class="sf-menu superfish-li-relative color-2">
									<li class="current-menu-item">
										<a href="index.php">Home</a>
									</li>
									<li><a href="#about">About</a></li>
                  <li><a href="#portfolio">portfolio</a></li>
									<li><a href="#contacts">contact</a></li>
									<li><a href="signin.php">Admin Login</a></li>
										<a href="#">Purchase</a>
									</li>
								</ul>
							</div>
			</div>
		</header>
		<!--View Area-->
		<section data-hash="Register" class="waypoint alt-bg-1 color-2">
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
												<input class="form-control" placeholder="Username" name="user" type="usrname" autofocus>
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
		<script type="text/javascript" src='js/jquery.min.js'></script>
		<script type="text/javascript" src='js/script.js'></script>
	</body>
</html>

<?php
    include("db/db_con.php");

    if(isset($_POST['submit']))
    {

        $user=$_POST['user'];
        $inPass=$_POST['pass'];
        $pass= password_hash($inPass, PASSWORD_BCRYPT);


        if($user=='')
        {
            echo"<script>alert('Please enter the name')</script>";
						exit();
        }
        if($inPass=='')
        {
            echo"<script>alert('Please enter the password')</script>";
						exit();
        }

        $check_admin_query="select * from Admin WHERE User='$user'";
        $run_query=mysqli_query($con,$check_admin_query);

        if(mysqli_num_rows($run_query)>0)
        {
					echo "<script>alert('Username $user is already exist in our database, Please try another one!')</script>";
					exit();
        }

        $insert_user="insert into Admin (User,Password) VALUE ('$user','$pass')";
        if(mysqli_query($con,$insert_user))
        {
            echo"<script>window.open('reg.php','_self')</script>";
        }
				mysqli_close($con);
    }

    ?>
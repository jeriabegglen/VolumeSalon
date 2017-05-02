<?php
	session_start();
	if(!$_SESSION['user'])
	{
		header("Location: signin.php");
	}
?>
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
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<script type="text/javascript" src='js/modernizr.min.js'></script>
	</head>
	<body>
		<div class="loader" style="text-align:center;"><div class="bar"><img src="img/logo.jpg" alt="Volume Salon" /><span class="progress"><span>loading...</span></span></div></div>
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
									<li><a href="signout.php">Sign Out</a></li>
								</ul>
							</div>
						</div></div>
				</div>
			</div>
		</header>
		<!--Welcome section-->
		</br>
		</br>
			</br>
		</br>
		<section>
		<form method="post" id="form" name="contact_form" class="big clearfix alt alt white-form" action="" data-animation="fadeInUp" data-delay="0.6">
										<div class="w3-row">
											<div class="w3-col s3 w3-center" width="200px"><input name="id" placeholder="Select Id" class=""/></div>
											<div class="w3-col s3 w3-center" width="200px"><input name="field" placeholder="Enter Field to Edit" class=""/></div>
											<div class="w3-col s3 w3-center" width="200px"><input name="new" placeholder="Enter New Field Info" class=""/></div>
											<div class="w3-col s3 w3-center"><button name="submit" align="center" value="submit" type="submit" class="button8 btn-1 send color-2">Submit Change</button></div>
										</div
										
									</form>
									</br>
			<table class="table table-bordered table-hover table-striped" style="table-layout: fixed">
										<thead>
											<tr>
												<th width="25px" align="center"><center>ID</center></th>
												<th width="45px" align="center"><center>Name</center></th>
												<th width="45px" align="center"><center>Image</center></th>
												<th width="50px" align="center"><center>Phone</center></th>
												<th width="60px" align="center"><center>Title</center></th>
												<th width="120px" align="center"><center>Description</center></th>
												<th width="150px" align="center"><center>Facebook</center></th>
												<th width="150px" align="center"><center>Instagram</center></th>
											</tr>
										</thead>

											<?php
												include("db/db_con.php");
												$sql = "SELECT ID, Name, Image, Title, Phone, Description,Facebook, Insta FROM Stylists";
												$result = $con->query($sql);

												if ($con->connect_error)
												{
													die("Connection failed: " . $con->connect_error);
												}
												if ($result->num_rows > 0)
												{
													while($row = $result->fetch_assoc())
												{
												?>
													<tr>
														<td><?php echo $row["ID"];  ?></td>
														<td><?php echo $row["Name"];  ?></td>
														<td><img src="<?php echo $row["Image"];  ?>" width="50px" height="50px" alt="" /></td>
														<td><?php echo $row["Phone"];  ?></td>
														<td><?php echo $row["Title"];  ?></td>
														<td><?php echo $row["Description"];  ?></td>
														<td><?php echo $row["Facebook"];  ?></td>
														<td><?php echo $row["Insta"];  ?></td>
														</tr>
												<?php
												}
											} else {
												echo "0 results";
											}
											?>
									</table>						
		</section>	
		</br>
		</br>
		</br>
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
	if(isset($_POST['submit']))
    {

		$id=$_POST['id'];
		$field=$_POST['field'];
		$new=$_POST['new'];
		
		
		if($id=='')
		{
			echo"<script>alert('Please enter new Id')</script>";
			exit();
		}
		if($field=='')
		{
			echo"<script>alert('Please enter new field info')</script>";
			exit();
		}
		if($new=='')
		{
			echo"<script>alert('Please enter new field info')</script>";
			exit();
		}
		if($field=="Instagram")
		{
			$field="Insta";
		}
		
		$sql = "UPDATE `Stylists` SET `$field` = '$new' WHERE `Stylists`.`ID` = $id";
		

		if(!mysqli_query($con, $sql))
		{
			echo("Error description: " . mysqli_error($con));
		}
		else{
			mysqli_close($con);
			echo"<script>window.open('profiles.php','_self')</script>";
		}
    }
	?>
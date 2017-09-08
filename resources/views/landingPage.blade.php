@extends('layouts.app')

@section('styles')
	<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<style type="text/css">
		#topgood{
			width: 100%;
		    background-image: url(http://eskipaper.com/images/eiffel-tower-sunset-1.jpg);
		    background-position: bottom;
		    background-size: cover;
		    height: 540px;
		    background-repeat: no-repeat;
		    color: white;
		    font-family: 'Lato', sans-serif;
		    text-align: center;
		    background-attachment: fixed;
		    

		}
		.parallax{
			width: 100%;
			padding-top: 10%;
			height: 550px;
			background-image: url(http://genheration.com/wp-content/uploads/2016/04/New-York-City-Skyline.jpg);
			background-attachment: fixed;
		    background-position: center;
		    background-repeat: no-repeat;
		    background-size: cover;
		    font-family: 'Lato', sans-serif;
		    font-weight:700;
			font-size: 2em;
			text-align: center;
			color: white;
			text-shadow: 0px 3px 4px rgba(0,0,0,0.4),
						 0px 4px 8px rgba(0,0,0,0.3);
		}
		#containinfo{
			padding-top: 10%;
			text-shadow: 0px 3px 4px rgba(0,0,0,0.4),
						 0px 4px 8px rgba(0,0,0,0.3);
		}

		.polaroid{
			margin: auto;
			width: 300px;
			height: auto;
		}
		#quote{
			color: gray;
			width: 100%;
			padding-bottom: 1px;
			box-shadow: 0 2px 3px rgba(0,0,0,0.2);
		}
		.row{
			margin:0;
			background-color: rgba(200,150,150,0.1);
			box-shadow: 0 2px 2px rgba(0,0,0,0.2);
		}
		button{
			color: rgba(0,0,0,0.8);
		}
		hr{
			width: 400px;
			border-top: 1px solid white;
			border-bottom: 1px solid rgba(0,0,0,0.2);
		}
		a{
			text-shadow: none;
		}

		h1{
			font-weight:700;
			font-size: 3em;
		}
		@media (max-width: 450px){
			hr{
				width: 90%;
			}
		}
	</style>
@endsection

@section('content')
<div style="width:100%;min-height: 100%;position: relative;">
	<div id="topgood">
		<div id="containinfo">
			<h1>FIND A PLACE TO TRAVLE</h1>
			<h3>Plan Your Trip</h3>
			<hr>
			<a href="http://planmytrip.com/register" class="btn btn-default">
<i class="fa fa-sign-in" aria-hidden="true"></i> Get Started!</a>
		</div>
	</div>
		<div id="quote">
			<blockquote class="quote"><i>Traveling – it leaves you speechless, then turns you into a storyteller.</i><br><p style="float: right;">-Ibn Battuta</p></blockquote>
		</div>
		<div class="row">
			<div class="container text-center">
				<h1>Choose from 100s of places</h1>
				<br>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-6 place1">
				<div class="polaroid">
					<img class="place-images" src="/images/eiffel.jpg">
					<div class="polaroid-text">
						<h4>PARIS</h4>
					</div>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-6 text-center place2">
				<div class="polaroid">
					<img class="place-images" src="/images/tajmahal.png">
					<div class="polaroid-text">
						<h4>INDIA</h4>
					</div>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-6 text-center place2">
				<div class="polaroid">
					<img class="place-images" src="/images/london.jpg">
					<div class="polaroid-text">
						<h4>LONDON</h4>
					</div>
				</div>
			</div>
		</div>
		<div class="parallax">
			<h1>Get Your Travel Plan Now.</h1>
		</div>

</div>
@endsection
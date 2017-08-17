<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Plan My Trip</title>
        <link rel="shortcut icon" href="/images/logo.png" />

        <link rel="stylesheet" href="{{mix('css/app.css')}}">
        <!-- Styles -->

    </head>
    <body>
        <div class="pimg">
            <div class="top-right nav navbar  ">
                <div class="links navbar-right">
                    @if (Auth::check())
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a style="cursor:pointer;" data-toggle="modal" data-target="#Login">Login</a>
                        <a style="cursor:pointer;" data-toggle="modal" data-target="#Register">Register</a>
                     <!--    <a href="{{ url('/login') }}">Login</a> 
                        <a href="{{ url('/register') }}">Register</a> -->
                    @endif
                </div>
                </div>
                <div class="mid-section text-center">
            
                <h1 class="mid-section-middle">PlanMyTrip.Com</h1>
  
        </div> 

    </div>
    <br>


    <div id="app"></div>


<br>
<div class="down-image down-text text-center" style="height: 200px;">
<br><br>
    <h1>Get Your Travel Plan Now.</h1>
<br><br>
<button type="button" class="btn btn-lg btn-info" data-toggle="modal" data-target="#Login">Login&nbsp;<span class="glyphicon glyphicon-chevron-right"></span></button>
    &nbsp;&nbsp;&nbsp;&nbsp;
        <button class="btn btn-lg btn-info" data-toggle="modal" data-target="#Register">Register&nbsp;<span class="glyphicon glyphicon-chevron-right"></span></button>


   <!--  Login Modal -->
<div id="Login" class="modal" role="dialog">
<div class="modal-dialog">

<div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Login</h4>
    </div>
    <div class="modal-body">
         @include('layouts.login_template')
    </div>
 <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
</div>
</div>
</div>

<!--   Register Modal -->
<div id="Register" class="modal" role="dialog">
<div class="modal-dialog">

<div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Register</h4>
    </div>
    <div class="modal-body">
         @include('layouts.register_template')
    </div>
 <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
</div>
</div>
</div>

</div>
    <script src="{{ mix('js/app.js')}}"></script>

    </body>
</html>

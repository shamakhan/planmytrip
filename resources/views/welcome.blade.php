<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Plan My Trip</title>
        <link rel="shortcut icon" href="/images/logo.png" />

        <link rel="stylesheet" href="{{mix('css/app.css')}}">
        <!-- Styles -->

    </head>
    <body>
    <div class="top-right nav navbar  ">
                <div class="links navbar-right">
                    @if (Auth::check())
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a style="cursor:pointer;" href="{{url('/login') }}">Login</a>
                        <a style="cursor:pointer;" href="{{ url('/register') }}">Register</a>
                     <!--    <a href="{{ url('/login') }}">Login</a> 
                        <a href="{{ url('/register') }}">Register</a> -->
                    @endif
                </div>
                </div>
       


    <div id="mainpage"></div>

    <script src="{{ mix('js/app.js')}}"></script>

    </body>
</html>

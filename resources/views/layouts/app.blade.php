<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'PlanMyTrip') }}</title>
        <link rel="shortcut icon" href="/images/logo.png" />

    <!-- Styles -->
    
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <style type="text/css" id="stylesht">
            img.polaroid {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);
          margin-bottom: 12px;
        }
        div.polaroid {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 12px;
}v

        .planPlaces{
background-color:#fafafa;
  padding:5px;
  height:auto;
  width:100%;
  margin-left:6px;
  margin-right:15px;
  margin-bottom:10px;
  border-radius:10px;
  cursor:grab;
}


.planPlaces > button{
  float:right;
    margin-top:-2px;
    margin-right:-2px;
    cursor:pointer;
    color: #fff;
    height: 2px;
    border: 1px solid #AEAEAE;
    border-radius: 10px;
    background: #605F61;
    font-size: 15px;
    font-weight: bold;
    display: inline-block;
    line-height: 0px;
    padding: 5px 2px; 
    white-space:nowrap;
    overflow:inherit;
}
.planPlaces > button:before {
    content: "×";
}

.planPlace a:hover{
  
  cursor:pointer;
}


.planImages{
  width:100px;
  height:90px;
}

.vertical-row {
 height:30px;
 width:10px;
 background-color: #c9c9c9;
} 

.vertical-row-parent{
  display:inline-flex;
}

.vertical-row-parent h5{
  margin-left:12px;
  color:#808080;
}


@media print {
    #noPrint {
        display: none;
    }

    #placeInfos{
        width:90%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 2%;
    }

    #planInfoParent{
        height:15%;
    }
    


    .myplan{
        page-break-inside: avoid;
    }

    .perDayPage{
        display: block;
        float:none !important;
        page-break-after: always;
    }

    #buttonCross{
        visibility: hidden;
    }

    #ratingInfos{
        visibility: hidden;
    }
}


    </style>
<style type="text/css">
    .navbar-default {
    background-color: #e6e9ea;
    border-color: #d3e0e9;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.4);
    padding-bottom: -15px; 
}

</style>
@yield('styles');

</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <div style="display: flex;flex-direction: row;">
                    <img src="/images/logo.png" style="height: 30px;margin-top: 5px;">&nbsp;<a class="navbar-brand" href="">
                        {{ config('app.name', ' Plan My Trip') }}
                    </a>
                    </div>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <div id="userName" style="display: inline-block;">{{ Auth::user()->name }} </div><span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>
<br/><br/><br/>
<div style="display: flex;flex-direction: column;justify-content: space-between;min-height: 91.9%">
    <div id="app">
        

        @yield('content')
    </div><br/>

   <footer class="container-fluid" style="color:lightgrey;bottom: 0;display: flex;flex-direction: row;z-index:2;justify-content: space-between;background-color: rgba(0,0,0,0.9    );width:100%">
     <p style="text-align:center">Copyright© PlanMyTrip.Com</p>
   
</footer>
</div>


    <!-- Scripts -->
    <script src="{{ mix('js/app.js')}}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbSvTtVYjuyn4aHvbEbrT5Ww77QqZw1ow"></script>
</body>
</html>

@extends('layouts.app')
 @section('navbarBrand')
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Plan My Trip') }}
                    </a>
                    @endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>
                <div class="panel-body">
                    @include('layouts.register_template')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

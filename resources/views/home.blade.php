@extends('layouts.app')

@section('navbarBrand')
<a class="navbar-brand" href="">
                        {{ config('app.name', 'Plan My Trip') }}
                    </a>
@endsection

@section('content')
<div class="container">
    <br/><br /><br />

    <div id="plan"></div>
</div>
@endsection

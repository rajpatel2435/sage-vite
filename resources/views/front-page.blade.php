@extends('layouts.app')

@section('content')


    <div class="max-w-[600px] mx-auto mt-4">

        <img class="rounded" src="{{ Vite::asset('resources/images/sage-vite.png') }}" alt="Sage + Vite Logo">

        <p class="text-center">
            @hello('Vite-Sage', 'Developers')
        </p>

        @if($reviews)
            <ul class="text-center ">
                @foreach ($reviews as $review)
                    <li>{!! $review->post_title !!}</li>
                @endforeach
            </ul>

        @else
            <p class="bg-black text-white text-center">You don't have anything in Reviews </p>    
        @endif

    </div>
    

@endsection

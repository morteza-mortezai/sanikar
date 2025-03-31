<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[AuthController::class,'register']);

Route::get('/tasks', [TaskController::class,'index'])->middleware('auth:sanctum');
Route::post('/tasks', [TaskController::class,'store']);
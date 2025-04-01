<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[AuthController::class,'logout']);
    Route::get('/tasks', [TaskController::class,'index']);
    Route::post('/tasks', [TaskController::class,'store']);
    Route::delete('/tasks/{task}', [TaskController::class,'destroy']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']); 
    Route::get('/tasks/{task}', [TaskController::class, 'show']); 
    Route::put('/tasks/status/{task}', [TaskController::class, 'updateStatus']); 
});

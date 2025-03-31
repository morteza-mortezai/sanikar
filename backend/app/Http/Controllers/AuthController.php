<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
   public function register(Request $request){
        $request->validate([
            'name'=>'required|string|min:5',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|min:5'
        ]);
        $user=User::create($request->all());
        return response()->json($user);
   }
}

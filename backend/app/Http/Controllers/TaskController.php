<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        return response()->json(Task::where('user_id',auth()->user()->id)->get());
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'description'=>'required|string'
        ]);
        $task=Task::create([
            'title'=> $request->title,
            'description'=> $request->description,
            'user_id'=> auth()->user()->id,
            'status'=>'pending'
        ]);
        return response()->json($task);
    }
}

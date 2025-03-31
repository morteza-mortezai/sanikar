<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        return response()->json(Task::all());
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'status'=>'in:pending,completed'
        ]);
        $task=Task::create($request->all());
        return response()->json($task);
    }
}

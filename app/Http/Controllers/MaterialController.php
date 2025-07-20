<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Course;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::with(['course', 'uploader'])->get();
        return Inertia::render('Materials', [
            'materials' => $materials,
        ]);
    }

    public function create()
    {
        $courses = Course::all();
        return Inertia::render('UploadMaterial', [
            'courses' => $courses,
        ]);
    }

    public function store(StoreMaterialRequest $request)
    {
        Material::create($request->validated());
        return redirect()->route('materials.index')
            ->with('success', 'Material uploaded successfully.');
    }

    public function show(Material $material)
    {
        return Inertia::render('Materials/Show', [
            'material' => $material->load(['course', 'uploader']),
        ]);
    }

    public function edit(Material $material)
    {
        $courses = Course::all();
        return Inertia::render('Materials/Edit', [
            'material' => $material->load(['course', 'uploader']),
            'courses' => $courses,
        ]);
    }

    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $material->update($request->validated());
        return redirect()->route('materials.index')
            ->with('success', 'Material updated successfully.');
    }

    public function destroy(Material $material)
    {
        $material->delete();
        return redirect()->route('materials.index')
            ->with('success', 'Material deleted successfully.');
    }
} 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Educate</title>
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/css/navbar.css', 'resources/css/dashboard.css', 'resources/js/app.tsx'])
</head>
<body class="antialiased">
    @inertia
</body>
</html>

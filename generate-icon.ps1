# TodoList App Icon Generator
# Simple SVG icon that can be converted to different sizes

Write-Host "Creating TodoList app icon..."

# Create SVG icon
$svgContent = @"
<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4169E1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2196F3;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="192" height="192" rx="24" fill="url(#bg)"/>
  
  <!-- Paper background -->
  <rect x="24" y="32" width="144" height="128" rx="12" fill="#ffffff" fill-opacity="0.95"/>
  
  <!-- Header line -->
  <rect x="40" y="56" width="112" height="2" fill="#e5e7eb"/>
  
  <!-- Task 1 (completed) -->
  <rect x="40" y="76" width="12" height="12" rx="3" fill="#22c55e"/>
  <path d="M43 82 L46 85 L49 79" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="60" y="80" width="80" height="2" fill="#9ca3af"/>
  <rect x="60" y="82" width="80" height="1" fill="#9ca3af"/>
  
  <!-- Task 2 (pending) -->
  <rect x="40" y="96" width="12" height="12" rx="3" fill="none" stroke="#9ca3af" stroke-width="1.5"/>
  <rect x="60" y="100" width="96" height="2" fill="#374151"/>
  
  <!-- Task 3 (pending) -->
  <rect x="40" y="116" width="12" height="12" rx="3" fill="none" stroke="#9ca3af" stroke-width="1.5"/>
  <rect x="60" y="120" width="72" height="2" fill="#374151"/>
  
  <!-- Plus icon (add task) -->
  <circle cx="152" cy="152" r="16" fill="#4f46e5"/>
  <rect x="148" y="144" width="8" height="16" fill="white" rx="1"/>
  <rect x="144" y="148" width="16" height="8" fill="white" rx="1"/>
</svg>
"@

# Create assets directory if it doesn't exist
$assetsDir = "assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir
}

# Save SVG file
$svgPath = Join-Path $assetsDir "todolist-icon.svg"
$svgContent | Out-File -FilePath $svgPath -Encoding UTF8

Write-Host "SVG icon created at: $svgPath"

# Create Android icon directories and copy a base icon
$androidResDir = "android\app\src\main\res"
$iconSizes = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72 
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

foreach ($folder in $iconSizes.Keys) {
    $folderPath = Join-Path $androidResDir $folder
    if (-not (Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath -Force
    }
}

Write-Host ""
Write-Host "Android icon directories created:"
foreach ($folder in $iconSizes.Keys) {
    Write-Host "   - $androidResDir\$folder"
}

Write-Host ""
Write-Host "To generate PNG icons from the SVG:"
Write-Host "   1. Open assets/todolist-icon.svg in any SVG editor"
Write-Host "   2. Export as PNG at the required sizes:"
foreach ($folder in $iconSizes.Keys) {
    $size = $iconSizes[$folder]
    Write-Host "      - ${size}x${size}px -> android/app/src/main/res/$folder/ic_launcher.png"
    Write-Host "      - ${size}x${size}px -> android/app/src/main/res/$folder/ic_launcher_round.png"
}

Write-Host ""
Write-Host "Online tools to convert SVG to PNG:"
Write-Host "   - https://convertio.co/svg-png/"
Write-Host "   - https://cloudconvert.com/svg-to-png"
Write-Host "   - https://svgtopng.com/"

Write-Host ""
Write-Host "Icon generated! Check the assets folder."

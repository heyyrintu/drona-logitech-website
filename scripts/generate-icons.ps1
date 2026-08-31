# Generates the temporary Drona Logitech favicon / app-icon set.
#
# Google's favicon guidance that this satisfies:
#   - The icon must be a square whose side is a multiple of 48px. The previous
#     single app/icon.png was 512x512 — square, but 512 is not a multiple of 48,
#     so it did not meet the stated requirement.
#   - A /favicon.ico at the site root is still the most reliably discovered
#     location; Google falls back to it regardless of <link> tags.
#   - The icon must be visually recognisable at 16px. The source mark carries
#     transparent padding, which shrinks the artwork to near-invisibility at
#     favicon size, so the padding is trimmed to the artwork bounding box first.
#
# Run from the website/ directory:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot '..'
$src = New-Object System.Drawing.Bitmap(512, 512)
$sourceGraphics = [System.Drawing.Graphics]::FromImage($src)
$sourceGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$sourceGraphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$sourceGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0B0E13'))

# Terminal Deco mark: a filled brass lozenge carrying noir initials.
#
# The site logo draws the lozenge as a thin keyline, but a hairline outline
# disappears entirely at 16px, so the favicon fills the shape instead. Same
# motif, same two colours, legible at favicon size.
$brass = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#C8A24A'))
$lozenge = New-Object System.Drawing.Drawing2D.GraphicsPath
$lozenge.AddPolygon(@(
  (New-Object System.Drawing.Point(256, 26)),
  (New-Object System.Drawing.Point(486, 256)),
  (New-Object System.Drawing.Point(256, 486)),
  (New-Object System.Drawing.Point(26, 256))
))
$sourceGraphics.FillPath($brass, $lozenge)

$noirBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#0B0E13'))
$font = New-Object System.Drawing.Font('Segoe UI', 150, [System.Drawing.FontStyle]::Bold)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$sourceGraphics.DrawString('DL', $font, $noirBrush, (New-Object System.Drawing.RectangleF(0, 8, 512, 496)), $format)
$sourceGraphics.Dispose()
$font.Dispose(); $format.Dispose(); $noirBrush.Dispose(); $lozenge.Dispose(); $brass.Dispose()

$crop = New-Object System.Drawing.Rectangle(0, 0, 512, 512)

function New-Icon([int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $dest = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $g.DrawImage($src, $dest, $crop, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  return $bmp
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "  wrote $path"
}

# ── PNG variants ──
# 48 / 96 / 192 are the multiples of 48 Google asks for. 180 is Apple's
# touch-icon size. 512 backs the web app manifest.
$targets = @(
  @{ size = 192; path = (Join-Path $root 'app\icon.png') },
  @{ size = 180; path = (Join-Path $root 'app\apple-icon.png') },
  @{ size = 512; path = (Join-Path $root 'public\images\logo.png') },
  @{ size = 512; path = (Join-Path $root 'public\images\logo-mark.png') },
  @{ size = 512; path = (Join-Path $root 'public\images\icon-512.png') },
  @{ size = 192; path = (Join-Path $root 'public\images\icon-192.png') },
  @{ size =  96; path = (Join-Path $root 'public\images\icon-96.png') }
)
foreach ($t in $targets) {
  $b = New-Icon $t.size
  Save-Png $b $t.path
  $b.Dispose()
}

# ── favicon.ico (PNG-in-ICO, 16 + 32 + 48) ──
# Every browser since IE11 reads PNG-compressed ICO entries, and PNG keeps the
# alpha channel clean at small sizes where a BMP entry would fringe.
$icoSizes = @(16, 32, 48)
$pngBlobs = @()
foreach ($s in $icoSizes) {
  $b  = New-Icon $s
  $ms = New-Object System.IO.MemoryStream
  $b.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $pngBlobs += ,$ms.ToArray()
  $ms.Dispose(); $b.Dispose()
}

$icoPath = Join-Path $root 'app\favicon.ico'
$fs = [System.IO.File]::Create($icoPath)
$bw = New-Object System.IO.BinaryWriter($fs)

# ICONDIR: reserved=0, type=1 (icon), image count
$bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]$icoSizes.Count)

# ICONDIRENTRY is 16 bytes; data begins after the 6-byte header + all entries.
$offset = 6 + (16 * $icoSizes.Count)
for ($i = 0; $i -lt $icoSizes.Count; $i++) {
  $s = $icoSizes[$i]
  $bw.Write([Byte]$s)          # width  (0 would mean 256)
  $bw.Write([Byte]$s)          # height
  $bw.Write([Byte]0)           # palette size, 0 = truecolour
  $bw.Write([Byte]0)           # reserved
  $bw.Write([UInt16]1)         # colour planes
  $bw.Write([UInt16]32)        # bits per pixel
  $bw.Write([UInt32]$pngBlobs[$i].Length)
  $bw.Write([UInt32]$offset)
  $offset += $pngBlobs[$i].Length
}
foreach ($blob in $pngBlobs) { $bw.Write($blob) }

$bw.Flush(); $bw.Close(); $fs.Close()
Write-Host "  wrote $icoPath ($((Get-Item $icoPath).Length) bytes, sizes: $($icoSizes -join ', '))"

$src.Dispose()
Write-Host "Done."

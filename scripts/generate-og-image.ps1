# Generates the Open Graph / Twitter social card at public/images/og-default.png
#
# Why a committed asset instead of Next's app/opengraph-image.jsx file
# convention: that route uses @vercel/og, which calls fileURLToPath() on its own
# bundled WASM asset. When the project sits at a path containing spaces — as it
# does here, under "OneDrive - DRONA LOGITECH PRIVATE LIMITED" — that call
# throws "Invalid URL" and fails the whole static export.
#
# The card changes only when branding changes, so generating it once and
# committing the PNG costs nothing per build and removes the failure mode.
#
# Run from the website/ directory:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1

Add-Type -AssemblyName System.Drawing

$width  = 1200
$height = 630
$out    = Join-Path $PSScriptRoot '..\public\images\og-default.png'

$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Daylight Deco card: ivory paper, parchment gradient, brass sunburst and
# a double-keyline architectural frame.
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$c1   = [System.Drawing.ColorTranslator]::FromHtml('#FFFCF7')
$c2   = [System.Drawing.ColorTranslator]::FromHtml('#F7F0E3')
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 90.0)
$g.FillRectangle($brush, $rect)

# Sunburst fan rising from below the card, matching .surface-hall on the site.
$rayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(24, 181, 122, 18))
$originX = 740.0
$originY = 760.0
for ($i = 0; $i -lt 44; $i++) {
  $a = ($i * 8.0 - 250.0) * [Math]::PI / 180.0
  $b = $a + (1.6 * [Math]::PI / 180.0)
  $r = 1500.0
  $ray = New-Object System.Drawing.Drawing2D.GraphicsPath
  $ray.AddPolygon(@(
    (New-Object System.Drawing.PointF([float]$originX, [float]$originY)),
    (New-Object System.Drawing.PointF([float]($originX + $r * [Math]::Cos($a)), [float]($originY + $r * [Math]::Sin($a)))),
    (New-Object System.Drawing.PointF([float]($originX + $r * [Math]::Cos($b)), [float]($originY + $r * [Math]::Sin($b))))
  ))
  $g.FillPath($rayBrush, $ray)
  $ray.Dispose()
}
$rayBrush.Dispose()

# Double keyline frame - the Deco border that runs through the whole site.
$brassColor = [System.Drawing.ColorTranslator]::FromHtml('#8A5A00')
$penOuter = New-Object System.Drawing.Pen($brassColor, 2)
$g.DrawRectangle($penOuter, 36, 36, $width - 72, $height - 72)
$penInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(80, 181, 122, 18), 1)
$g.DrawRectangle($penInner, 46, 46, $width - 92, $height - 92)

# Logo lockup: brass lozenge keyline plus tracked wordmark.
$brass = New-Object System.Drawing.SolidBrush($brassColor)
$ink = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#171418'))
$signal = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#DE1C1C'))
$markPen = New-Object System.Drawing.Pen($brassColor, 2)
$mark = New-Object System.Drawing.Drawing2D.GraphicsPath
$mark.AddPolygon(@(
  (New-Object System.Drawing.Point(112, 84)),
  (New-Object System.Drawing.Point(146, 118)),
  (New-Object System.Drawing.Point(112, 152)),
  (New-Object System.Drawing.Point(78, 118))
))
$g.DrawPath($markPen, $mark)
$markFont = New-Object System.Drawing.Font('Segoe UI', 11, [System.Drawing.FontStyle]::Bold)
$markFmt = New-Object System.Drawing.StringFormat
$markFmt.Alignment = [System.Drawing.StringAlignment]::Center
$markFmt.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString('DL', $markFont, $brass, (New-Object System.Drawing.RectangleF(78, 84, 68, 68)), $markFmt)

$brandFont = New-Object System.Drawing.Font('Segoe UI Light', 24)
$g.DrawString('D R O N A   L O G I T E C H', $brandFont, $ink, 168, 104)

# Headline
$h1 = New-Object System.Drawing.Font('Segoe UI Light', 46)
$g.DrawString('INTEGRATED LOGISTICS', $h1, $ink, 76, 250)
$g.DrawString('AND SUPPLY CHAIN', $h1, $signal, 76, 320)

# Brass rule with a centred lozenge - the divider motif from the site.
$rulePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(125, 181, 122, 18), 1)
$g.DrawLine($rulePen, 78, 412, 460, 412)
$loz = New-Object System.Drawing.Drawing2D.GraphicsPath
$loz.AddPolygon(@(
  (New-Object System.Drawing.Point(269, 405)),
  (New-Object System.Drawing.Point(276, 412)),
  (New-Object System.Drawing.Point(269, 419)),
  (New-Object System.Drawing.Point(262, 412))
))
$g.FillPath($brass, $loz)

# Sub-line
$bone    = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#534C46'))
$subFont = New-Object System.Drawing.Font('Segoe UI', 18)
$g.DrawString('In-plant  /  Warehousing  /  Inventory  /  Packaging  /  Last-mile delivery', $subFont, $bone, 76, 450)

# Footer rule and meta
$footPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(80, 181, 122, 18), 1)
$g.DrawLine($footPen, 78, 520, 1122, 520)

$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#70675E'))
$smallFont  = New-Object System.Drawing.Font('Segoe UI', 15)
$g.DrawString('EMPOWERING PEOPLE', $smallFont, $mutedBrush, 78, 546)

$domain = 'One accountable partner, every link of the chain.'
$size   = $g.MeasureString($domain, $smallFont)
$g.DrawString($domain, $smallFont, $mutedBrush, (1122 - $size.Width), 546)

$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Host "Wrote $out ($width x $height)"

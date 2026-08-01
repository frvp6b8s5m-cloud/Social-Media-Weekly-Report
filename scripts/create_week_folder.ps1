param(
    [string]$StartDate,
    [string]$EndDate,
    [switch]$NoOpen
)

$ErrorActionPreference = "Stop"

$projectRoot = if ($PSScriptRoot) {
    Split-Path -Parent $PSScriptRoot
} else {
    (Get-Location).Path
}
$dataRoot = Join-Path $projectRoot "data\周报数据"
$template = Join-Path $dataRoot "_每周复制模板"

Write-Host "ReelShort 周报数据文件夹创建工具" -ForegroundColor Green
$startText = if ($StartDate) { $StartDate } else { Read-Host "请输入周一日期 (YYYY-MM-DD)" }
$endText = if ($EndDate) { $EndDate } else { Read-Host "请输入周日日期 (YYYY-MM-DD)" }

$start = [datetime]::MinValue
$end = [datetime]::MinValue
$format = "yyyy-MM-dd"
$culture = [Globalization.CultureInfo]::InvariantCulture
$style = [Globalization.DateTimeStyles]::None

if (-not [datetime]::TryParseExact($startText, $format, $culture, $style, [ref]$start) -or
    -not [datetime]::TryParseExact($endText, $format, $culture, $style, [ref]$end)) {
    throw "日期格式不正确，请使用 YYYY-MM-DD。"
}
if ($start.DayOfWeek -ne [DayOfWeek]::Monday -or $end.DayOfWeek -ne [DayOfWeek]::Sunday -or ($end - $start).Days -ne 6) {
    throw "日期必须是同一周的周一至周日。"
}

$folderName = "{0}_{1}_周报数据" -f $start.ToString($format), $end.ToString($format)
$destination = Join-Path $dataRoot $folderName
if (Test-Path -LiteralPath $destination) {
    throw "目标文件夹已存在：$destination"
}

Copy-Item -LiteralPath $template -Destination $destination -Recurse
Write-Host ""
Write-Host "已创建：$destination" -ForegroundColor Green
if (-not $NoOpen) {
    Start-Process explorer.exe -ArgumentList $destination
}

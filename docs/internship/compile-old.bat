@echo off
echo Compiling LaTeX document...
echo.

cd /d "%~dp0"

:: ── Snapshot PDFs that exist BEFORE compilation ──────────────────────────────
set "BEFORE_LIST=%TEMP%\latex_before.txt"
set "AFTER_LIST=%TEMP%\latex_after.txt"
dir /b *.pdf > "%BEFORE_LIST%" 2>nul

:: ── Compile (two passes for TOC and references) ───────────────────────────────
echo First pass...
pdflatex -interaction=batchmode system-analysis-design-latex.tex

echo Second pass (for TOC and references)...
pdflatex -interaction=batchmode system-analysis-design-latex.tex

echo.
echo ============================================
echo Compilation Complete!
echo ============================================
echo.

:: ── Snapshot PDFs that exist AFTER compilation ───────────────────────────────
dir /b *.pdf > "%AFTER_LIST%" 2>nul

:: ── Strategy 1: find a brand-new PDF (name didn't exist before) ──────────────
set "TARGET_PDF="
for /f "delims=" %%F in ('findstr /v /i /g:"%BEFORE_LIST%" "%AFTER_LIST%" 2^>nul') do (
    set "TARGET_PDF=%%F"
)

:: ── Strategy 2: if no new name, find the most recently modified PDF ───────────
if not defined TARGET_PDF (
    for /f "delims=" %%F in ('dir /b /od *.pdf 2^>nul') do (
        set "TARGET_PDF=%%F"
    )
)

:: ── Open whichever PDF was found ──────────────────────────────────────────────
if defined TARGET_PDF (
    echo Output PDF: %TARGET_PDF%
    echo Opening %TARGET_PDF% ...
    start "" "%TARGET_PDF%"
) else (
    echo ERROR: No PDF was created. Check the log file for errors.
    if exist system-analysis-design-latex.log (
        start "" "system-analysis-design-latex.log"
    )
)

:: ── Clean up temp files ───────────────────────────────────────────────────────
del "%BEFORE_LIST%" 2>nul
del "%AFTER_LIST%" 2>nul

pause

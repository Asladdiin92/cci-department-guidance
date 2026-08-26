@echo off
echo ====================================
echo  Compiling Internship Report
echo ====================================
echo.
echo Running pdflatex (pass 1)...
pdflatex -interaction=nonstopmode -halt-on-error "complete-internship-report.tex"
echo.
echo Running pdflatex (pass 2)...
pdflatex -interaction=nonstopmode -halt-on-error "complete-internship-report.tex"
echo.
echo ====================================
echo  Compilation Complete!
echo ====================================
echo.
echo Output: complete-internship-report.pdf
echo Build artifacts moved to: build\
echo.

REM Move build artifacts to build folder
if exist "complete-internship-report.aux" move /Y "complete-internship-report.aux" "build\" > nul
if exist "complete-internship-report.log" move /Y "complete-internship-report.log" "build\" > nul
if exist "complete-internship-report.out" move /Y "complete-internship-report.out" "build\" > nul
if exist "complete-internship-report.toc" move /Y "complete-internship-report.toc" "build\" > nul
if exist "complete-internship-report.lot" move /Y "complete-internship-report.lot" "build\" > nul
if exist "complete-internship-report.lof" move /Y "complete-internship-report.lof" "build\" > nul

echo Build artifacts organized.
pause

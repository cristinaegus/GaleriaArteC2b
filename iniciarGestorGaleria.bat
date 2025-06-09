@echo off
REM Script para arrancar FastAPI con main_galeria.py en el puerto 8000
cd /d %~dp0
uvicorn main_galeria:app --reload --port 8000
pause
@echo off
for /f "delims=" %%t in ('gh auth token') do set GITHUB_PERSONAL_ACCESS_TOKEN=%%t
if not defined GITHUB_PERSONAL_ACCESS_TOKEN goto :notoken
"%USERPROFILE%\tools\github-mcp-server.exe" stdio
goto :eof
:notoken
echo gh auth token nao retornou nada -- rode "gh auth login" primeiro. 1>&2
exit /b 1

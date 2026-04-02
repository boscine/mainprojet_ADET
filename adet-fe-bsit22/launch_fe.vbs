Set WshShell = CreateObject("WScript.Shell")
' This line automatically finds the folder the script is sitting in
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = strPath

' Update the line below to include the proxy flag
WshShell.Run "cmd /c ng serve --proxy-config proxy.conf.json", 0

Set WshShell = Nothing
ok give me detailed ecplanation summary,script and comment with above chat
What happened

1. scrcpy was installed
• Installed version: scrcpy 4.1
•  adb  was available and working.
2. USB connection failed
• The phone was charging and showed the USB/File Transfer notification.
• Windows did not detect an Android/MTP/ADB device.
•  adb devices -l  returned an empty list.
• A hardware rescan did not help, indicating a likely charge-only cable, USB-port issue, or missing phone-specific driver.
3. Wireless debugging was used instead
• The phone and computer were connected to the same Wi-Fi network.
• Android Wireless Debugging pairing succeeded.
• The phone was identified as:
Samsung SM-A047F
Android 14
4. Wireless ADB connection succeeded
10.232.100.217:37757
The device appeared as  device , which means authorization was successful.
5. Phone audio only
• This command worked:
scrcpy -s 10.232.100.217:37757 --no-audio
It mirrors and controls the phone while keeping sound on the phone.

6. Phone and PC speakers simultaneously
• scrcpy supports this using  --audio-dup .
• The attempted command was correct:
scrcpy -s 10.232.100.217:37757 --audio-source=playback --audio-dup
• Windows returned a WASAPI permission/mix-format error because the command was running from an elevated Administrator PowerShell:
WASAPI can't determine mix format: Access is denied
The Windows audio services and sound devices were present, so the recommended fix is to run scrcpy from a normal, non-Administrator PowerShell window.


────────────────────

Recommended script

Open a regular PowerShell window—not Run as administrator—and run this script:

# The wireless ADB address shown on the phone's main
# Developer options > Wireless debugging screen.
$Device = "10.232.100.217:37757"

# Make sure the wireless ADB connection is active.
adb connect $Device

# Confirm that Android reports the device as authorized.
$ConnectedDevice = adb devices | Select-String -SimpleMatch "$Device`tdevice"

if (-not $ConnectedDevice) {
    Write-Error "Android device was not connected or authorized: $Device"
    exit 1
}

# Start scrcpy with:
# - the selected wireless device
# - Android playback audio captured by scrcpy
# - audio duplicated so it remains on the phone and is also played on the PC
scrcpy `
    -s $Device `
    --audio-source=playback `
    --audio-dup

Save it as, for example:

C:\Users\hp\scrcpy-phone-and-pc.ps1

Run it with:

powershell -ExecutionPolicy Bypass -File C:\Users\hp\scrcpy-phone-and-pc.ps1

If PowerShell blocks script execution, the  -ExecutionPolicy Bypass  option applies only to that script launch and does not permanently change the computer’s policy.

────────────────────

Simpler commands

For phone audio only:

adb connect 10.232.100.217:37757
scrcpy -s 10.232.100.217:37757 --no-audio

For phone and PC audio simultaneously:

adb connect 10.232.100.217:37757
scrcpy -s 10.232.100.217:37757 --audio-source=playback --audio-dup

For PC audio only, without keeping sound on the phone:

adb connect 10.232.100.217:37757
scrcpy -s 10.232.100.217:37757 --audio-source=output

────────────────────

Important comments

• Use a normal PowerShell, not an elevated Administrator PowerShell, for PC audio playback.
• Keep the phone and computer on the same Wi-Fi network.
• The phone must remain enabled under Developer options → Wireless debugging.
• If the phone’s IP address or wireless debugging port changes, update the  $Device  value.
• The pairing port and connection port are different. The script uses the main Wireless debugging connection port, not the temporary pairing port.
•  --audio-source=playback  is required for  --audio-dup .
• Some Android apps may block audio capture; this is controlled by Android and cannot always be overridden by scrcpy.
• Press Ctrl+C in PowerShell or close the scrcpy window to stop mirroring.
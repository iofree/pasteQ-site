---
title: Auto Paste, iCloud Sync and iPhone Keyboard FAQ
description: Troubleshoot PasteQ's Mac paste permissions, login items, iCloud sync and iPhone keyboard, and learn how source filters and iOS clipboard access work.
---

# PasteQ Frequently Asked Questions

Here are the most common questions and solutions for users of PasteQ.

## Does PasteQ start automatically when I log in?

The current version does not have an in-app launch-at-login switch. You can add PasteQ to the Open at Login list in macOS under System Settings → General → Login Items. Labels may vary by macOS version.

## Why does pressing Enter on Mac not paste automatically?

Enable automatic paste in PasteQ settings, then allow PasteQ under System Settings → Privacy & Security → Accessibility. On older macOS versions, use System Preferences → Security & Privacy → Privacy → Accessibility.

If permission is enabled but pasting still fails, remove PasteQ from the Accessibility list, add it again, enable permission and restart PasteQ. Some apps or input fields may not accept automatic paste. In that case, copy the record and paste it manually in the target field.

See [Getting Started](./getting-started) for shortcuts and Pin groups.

## Does iPhone automatically save everything I copy in other apps?

No. The Mac app records clipboard history while it is running. On iOS, you can view synced records and manually add, edit and organize content. PasteQ does not continuously capture clipboard history from other apps in the background on iOS.

## Which device identifies source apps?

Source apps are identified on Mac. After records sync, both Mac and iOS can filter and search by source. A source label on iOS does not mean PasteQ monitors other apps there.

## Why has a Mac record not appeared on my iPhone yet?

Check that both devices use the same Apple Account, iCloud Drive is enabled, PasteQ has iCloud permission, and iCloud sync is enabled inside PasteQ. Open PasteQ on both devices, check the sync status and try a manual sync if needed. Timing depends on your network, iCloud and whether the app is running.

See [Multi-Device Sync](./multi-device-sync) for setup and troubleshooting.

## Does the PasteQ keyboard need Allow Full Access?

No. The keyboard uses local pinned and grouped text updated by the main app. Once added, you can switch to PasteQ in input fields that support third-party keyboards.

## Why is a record missing from the keyboard?

Make sure it is a text record in Pin or an enabled custom group. Open PasteQ on your iPhone, allow sync and content updates to finish, then switch back to the keyboard. Images, files and encrypted records are excluded. Each group shows up to 100 recent eligible text records, and long text may be truncated.

See the [iPhone keyboard guide](./iphone-keyboard) for setup, refreshing content and compatibility.

Need the app? [Download PasteQ from the App Store](https://apps.apple.com/app/id6443971843). For other questions, [contact us](./contact).

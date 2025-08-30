# Kart Stint Calculator

## Overview
Web-based stint calculator for 7-hour endurance kart racing. Manages driver rotation, stint timing, and race strategy compliance.

## Race Regulations
- **Duration**: 7 hours
- **Team Size**: 3 drivers per team
- **Stints**: 14 total (minimum 13 pitstops)
- **Stint Duration**: Minimum 10 minutes, Maximum 38 minutes
- **Pit Time**: Minimum 2 minutes (includes mandatory driver & kart change)
- **Minimum Driving Time**: 100 minutes per driver (3-driver team)
- **Pitlane**: May close for accidents, SafetyKart, or final 20 minutes

## System Features

### Time Management
- All times displayed in hh:mm:ss format
- Automatic conversion between formats for calculations
- Persistent storage in browser (survives phone lock/browser refresh)

### Lap Calculation
- **Average Lap Time**: Expected 1:24:00 (adjustable)
- **Outlap Time**: Time for pit exit to start/finish line
- **Inlap Time**: Time from start/finish to pit entry
- **Formula**: Total Laps = (Stint Time - Outlap - Inlap) / Average Lap Time

### Driver Management
- Fixed 3-driver configuration
- Editable driver names for identification
- Color-coded driver assignments (Blue, Green, Red)
- Real-time tracking of total driving time per driver
- Automatic validation of minimum driving requirements

### Stint Tracking
- 14 pre-configured stints
- Adjustable stint duration
- Driver assignment per stint
- Mark stints as completed
- Visual warnings for regulation violations
- Start time calculation for each stint

### Data Persistence
- Automatic save to browser local storage
- Survives page refresh and phone lock
- Manual save button for explicit saves
- Reset button to clear all data

## Usage

1. **Setup**: Enter driver names and configure lap times
2. **Planning**: Assign drivers to stints and set durations
3. **Racing**: Mark stints as completed during the race
4. **Monitoring**: Track total times and regulation compliance

## Technical Notes
- Pure HTML/CSS/JavaScript (no dependencies)
- Works offline once loaded
- Mobile and desktop responsive
- Compatible with all modern browsers
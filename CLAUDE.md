# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gifts Can Think** is a demonstration portfolio site hosted at `demo.giftsthatthink.com`. This repository showcases client demos and proof-of-concept applications to demonstrate technical capabilities.

## Repository Architecture

**Multi-Tenant Demo Structure**: Each client/demo exists as a self-contained folder at the root level.

### Key Principles

1. **Folder Isolation**: Each client demo is completely self-contained within its own folder
2. **Technology Stack**: Demos are built using vanilla HTML, CSS, and JavaScript
3. **No Shared Dependencies**: Each demo should work independently without relying on shared libraries or build systems
4. **Purpose**: To show potential clients what is possible through working demonstrations

### Current Demos

- `energiasg/` - EnergySG demo application

## Development Guidelines

### Creating a New Demo

When creating a new client demo from a PRD:

1. Create a new folder at the root level named after the client (e.g., `clientname/`)
2. Keep all demo assets (HTML, CSS, JavaScript, images) within that folder
3. Use vanilla HTML/CSS/JavaScript - no build process required
4. Ensure the demo is fully self-contained and portable
5. Include an `index.html` as the entry point

### Technology Constraints

- **Primary Stack**: HTML, CSS, JavaScript (vanilla)
- **No Build Tools**: Demos should work by opening `index.html` directly
- **Self-Contained**: All assets must be included in the demo folder

## Deployment

Demos are deployed to subdomains/paths under `demo.giftsthatthink.com`.

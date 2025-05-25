---
layout: post
title: QXL With Wayland And 4K Resolution
---

The default memory limit for the QXL video card is very conservative. If you're running FullHD or higher resolution it is adviced to increase the memory by editing the xml.

### Behaviour
- Frozen screen

# QXL Configuration Guide

### Windows Guest
- `vgamem = (width * height * 4) / 1024`
- `ram = 4 * vgamem`
- `vram`: Unimportant (e.g., 8 MB)

### Modern Linux Guest (KMS driver)
- `vgamem = (width * height * 4 * heads) / 1024`  
  - **Heads** = number of screens  
  - **Wayland**: Double the result  
  - Round up to nearest power of 2 if using Virt-Manager
- `ram = 4 * vgamem`
- `vram >= vgamem * 2`

## Key Notes
- **Wayland Warning**: Avoid in VMs—poor performance (stuttering, low FPS). Use X11 for guests.
- **Max Resolution**: 
  - X11: 2560x1600 (optimal performance at ≤1080p)
  - Higher resolutions may impact performance.

## Example Configs

### 4K (3840x2160) - Wayland Guest
```xml
<video>
  <model type="qxl" ram="524288" vram="262144" vgamem="131072" heads="1" primary="yes"/>
  <address type="pci" domain="0x0000" bus="0x00" slot="0x01" function="0x0"/>
</video>
```

### 4k (3840x2160) - X11 Guest
```xml
<video>
  <model type="qxl" ram="131072" vram="65536" vgamem="32768" heads="1" primary="yes"/>
  <address type="pci" domain="0x0000" bus="0x00" slot="0x01" function="0x0"/>
</video>
```

### Additional Advice
- Avoid excessive memory allocation—wastes RAM without performance gains.
- Screen arrangement impacts memory needs (e.g., compact vs. diagonal layouts).
